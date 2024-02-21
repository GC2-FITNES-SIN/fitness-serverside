require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

let db;

db = client.db("Project-1");
if (process.env.NODE_ENV === "test") db = client.db("test")

module.exports = db;
