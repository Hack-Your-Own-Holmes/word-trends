require("dotenv").config();
const express = require("express");
const monk = require("monk");
const cors = require("cors");
const { response } = require("express");
const nf = require("node-fetch");
const ObjectId = require("mongodb").ObjectID;
const PORT = process.env.PORT;

const app = express();
app.use(cors());

//set up mongo client
const MongoClient = require("mongodb").MongoClient;

//get access to cluster with user name and password
const uri = process.env.MONGO_URI;

//params for the mongoclient
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect((err) => {
	//query into the collection
	const collection = client
		.db("movie_information")
		.collection("word_statistics");
	//get request for any word
	app.get("/:word", (req, res) => {
		const word = req.params.word;
		const getData = async () => {
			// search the database (collection) for all entries with the 'word' route paramter
			const data = collection.find({ [word]: { $exists: true } }).toArray();
			return data;
		};
		//Send data back to the client once recieved
		getData().then((data) => res.send(data));
	}),
		app.get("/", (req, res) => {
			res.json({
				myMessage: "sample response at root",
			});
		});

	//   client.close();
});

app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
