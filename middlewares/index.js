const { ObjectId } = require("mongodb");
const db = require("../config/mongoConn");
const { verifyToken } = require("../helpers");

const authentication = async (req, res, next) => {
	try {
		let tokens = req.headers.authorization;
		if (!tokens) throw { name: "InvalidToken" };
		const [bearer, token] = tokens.split(" ");

		if (bearer !== "Bearer" || !token) throw { name: "InvalidToken" };

		const payload = verifyToken(token);

		const user = await db.collection("users").findOne({ email: payload.email });
		
		req.user = {
			id: user._id,
		};

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = authentication;
