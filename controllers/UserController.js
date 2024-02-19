const db = require("../config/mongoConn");
const bcrypt = require("bcryptjs");
const { comparePass, signToken, hashPass } = require("../helpers/index");
const { error } = require("console");


class UserController {
    static async register(req, res, next) {
        try {
            const { name, username, email, password, phoneNumber, image, gender, weight, height } = req.body
            if (!name) throw {name: "BadRequest", message: "Name is required"}
            if (!username) throw {name: "BadRequest", message: "Username is required"};
            if (!email) throw {name: "BadRequest", message: "Email is required"};
            if (!password) throw {name: "BadRequest", message: "Password is required"}
            if (!weight) throw {name: "BadRequest", message: "Weight is required"}
            if (!height) throw {name: "BadRequest", message: "Height is required"}
            let userInput = {
                name,
                username,
                email,
                password : hashPass(password),
                phoneNumber,
                image,
                gender,
                weight,
                height,
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

            return res.status(201).json({message: "Register success", data: newUser});
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

            const match = comparePass(password, user.password);

            if (!match) throw {name: "Unauthorized", message: "Wrong password"};

            const payload = signToken({
                id: user._id,
                username: user.username
            });

            const access_token = payload;

            return res.status(200).json({message: "Login success", token: access_token});

        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;