const db = require('../config/mongoConn');
const { verifyToken } = require('../helpers');

const authentication = async (req, res, next) => {
    try {
        let token = req.headers.authroization;
        if (!token) throw {name: "InvalidToken"};

        if (token.slice(0, 7) !== "Bearer ") throw {name: "InvalidToken"};

        token = token.slice(7);

        const payload = verifyToken(token);

        const user = await db.collection("users").findOne({_id: payload.id});
        console.log(user, "UUUSEEERRR");

        req.user = {
            id: user.id
        }

        console.log("auth");
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authentication;