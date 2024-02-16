const db = require("../config/mongoConn");

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

            res.status(201).json({message: "Register success"});
        } catch (error) {
            // next(error);
            console.log(error);
        }
    };

    static async login(req, res, next) {}
}

module.exports = UserController;