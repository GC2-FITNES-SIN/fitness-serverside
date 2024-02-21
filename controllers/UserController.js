const { ObjectId } = require("mongodb");
const db = require("../config/mongoConn");

const bcrypt = require("bcryptjs");
const { comparePass, signToken, hashPass } = require("../helpers/index");
const { error } = require("console");

class UserController {
    static async register(req, res, next) {
        // const body = req.body;
        // console.log(body, ">>>");
        try {

            const { name, username, email, password, phoneNumber, image, gender, weight, height } = req.body
            if (!name) throw {name: "BadRequest", message: "Name is required"}
            if (!username) throw {name: "BadRequest", message: "Username is required"};
            if (!email) throw {name: "BadRequest", message: "Email is required"};
            if (!password) throw {name: "BadRequest", message: "Password is required"}
            if (!weight) throw {name: "BadRequest", message: "Weight is required"}
            if (!height) throw {name: "BadRequest", message: "Height is required"}
            let userInput = {
                ...body,
                password: hashPass(body.password),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            function validateEmailFormat(email) {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailPattern.test(email);
            }

            if (!validateEmailFormat(userInput.email)) throw {name: "BadRequest", message: "Invalid email format"};

            const validateEmail = await db.collection('users').findOne({email});

            if(validateEmail) throw {name: "BadRequest", message: "Email already exist"}  


            let newUser = await db.collection("users").insertOne(userInput);

            res.status(201).json({message: "Register success"});
        } catch (error) {
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

            if (!userInput.email) throw {name: "BadRequest", message: "Email cannot be empty"};
            if (!userInput.password) throw {name: "BadRequest", message: "Password cannot be empty"}

            let findUser = await db.collection("users").findOne({email: userInput.email});

            if (!findUser) throw {name: "Unauthorized" }

            let isValidPassword = comparePass(userInput.password, findUser.password);

            if (!isValidPassword) throw {name: "Unauthorized"}

            if (userInput.email !== findUser.email) throw { name: "Unauthorized" };

            const accessToken = signToken({ id: findUser._id, name: findUser.name, username: findUser.username, email: findUser.email, phoneNumber: findUser.phoneNumber, gender: findUser.gender, weight: findUser.weight, height: findUser.height, image: findUser.image, age: findUser.age })

            res.status(200).json({username: findUser.username,
                email: findUser.email,
                image: findUser.image,
                age: findUser.age,
                gender: findUser.gender,
                weight: findUser.weight,
                height: findUser.height,
                access_Token: accessToken});
        } catch (error) {
            console.log(error);
            if (error.name === "BadRequest") {
                res.status(400).json({ message: error.message });
            } else if (error.name === "Unauthorized") {
                res.status(401).json({ message: "Invalid email or password" })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    };

    static async updateUser(req, res, next) {
        try {
            const body = req.body;
            console.log(body, "BODYY");
            const bodyData = {
                ...body,
                updatedAt: new Date()
            };

            const data = await db.collection("users").updateOne(
                { _id: new ObjectId(req.user.id) },
                { $set: bodyData }
            );


            res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            console.log(error);
            next(error);
        }

    }
}

module.exports = UserController;