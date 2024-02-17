const db = require("../config/mongoConn");
const bcrypt = require("bcryptjs");
const { comparePass, signToken } = require("../helpers/index");


class UserController {
    static async register(req, res, next) {
        try {
            let userInput = {
                name: "",
                username: "",
                email: "",
                password: "",
                phoneNumber: "",
                image: "",
                gender: "",
                weight: "",
                height: "",
                createdAt: new Date(),
                updatedAt: new Date()
            };

            if (!userInput.username) throw {name: "BadRequest", message: "Username is required"};
            if (!userInput.email) throw {name: "BadRequest", message: "Email is required"};
            if (!userInput.password) throw {name: "BadRequest", message: "Password is required"}
            if (!userInput.weight) throw {name: "BadRequest", message: "Weight is required"}
            if (!userInput.height) throw {name: "BadRequest", message: "Height is required"}

            let newUser = await db.collection("users").insertOne(userInput);

            return res.status(201).json({message: "Register success"});
        } catch (error) {
            next(error);
        }
    };

    static async login(req, res, next) {
        try {
            const { username, password } = req.body;

            if (!username) throw {name: "BadRequest", message: "Username is required"};
            if (!password) throw {name: "BadRequest", message: "Password is required"};

            const user = await db.collection("users").findOne({ username }); 

            if (!user) throw {name: "NotFound", message: "Username not found"};

            const match = await bcrypt.compare(password, user.password);

            if (!match) throw {name: "Unauthorized", message: "Wrong password"};

            const payload = signToken({
                id: user._id,
                username: user.username
            });

            const access_token = payload;

            return res.status(200).json({message: "Login success", token: access_token});

        } catch (error) {
            
        }
    }
}

module.exports = UserController;