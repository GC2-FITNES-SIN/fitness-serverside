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

let db 

console.log(process.env.NODE_ENV, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
if(process.env.NODE_ENV === 'test') {
	db = client.db(process.env.DB_NAME_TESTING);
} else db = client.db(process.env.DB_NAME_DEVELOPMENT);


module.exports = db;
