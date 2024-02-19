const { ObjectId } = require("mongodb");
const db = require("../config/mongoConn");
const { hashPass, comparePass, signToken } = require("../helpers");

class UserController {
    static async register(req, res, next) {
        const body = req.body;
        console.log(body, ">>>");
        try {
            let userInput = {
                ...body,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            let findUser = await db.collection("users").findOne({email: userInput.email});

            if (findUser) throw {name: "BadRequest", message: "Email already exist"}

            if (!userInput.username) throw {name: "BadRequest", message: "Username is required"};
            if (!userInput.email) throw {name: "BadRequest", message: "Email is required"};
            if (!userInput.password) throw {name: "BadRequest", message: "Password is required"}
            if (!userInput.weight) throw {name: "BadRequest", message: "Weight is required"}
            if (!userInput.height) throw {name: "BadRequest", message: "Height is required"}

            let newUser = await db.collection("users").insertOne(userInput);

            res.status(201).json({message: "Register success"});
        } catch (error) {
            // console.log("<<<<" ,error, ">>>>");
            if (error.name === "BadRequest") {
                res.status(400).json({message: error.message});
            } else {
                res.status(500).json({message: "Internal server error"})
            }
        }
    };

    static async login(req, res, next) {
        try {
            const body = req.body;
            let userInput = {
                ...body,
            };

            if (!userInput.username) throw {name: "BadRequest", message: "Username cannot be empty"};
            if (!userInput.email) throw {name: "BadRequest", message: "Email cannot be empty"};
            if (!userInput.password) throw {name: "BadRequest", message: "Password cannot be empty"}

            let findUser = await db.collection("users").findOne({email: userInput.email});

            if (!findUser) throw {name: "Unauthorized" }

            let isValidPassword = comparePass(userInput.password, findUser.password);

            if (!isValidPassword) throw {name: "Unauthorized"}

            if (email !== findUser.email) throw { name: "Unauthorized" };

            const accessToken = signToken({ id: findUser._id })

            res.status(200).json({username: findUser.username, access_Token: accessToken});
            // req.status(200).json({message: "Login success"});
        } catch (error) {
            console.log(error);
            if (error.name === "Unauthorized") {
                res.status(401).json({ message: "Invalid email or password" })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }
}

module.exports = UserController;