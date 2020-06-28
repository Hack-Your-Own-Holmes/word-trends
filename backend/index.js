const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, MONGODB_URI } = require("./utils/config");
// const scrape = require("./utils/scraper");

//Set up default mongoose connection
mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Successful connection to db");
	})
	.catch((error) => {
		console.log("Failed to connect to db");
	});

// scrape("abandon").then(() => console.log("done"));

app.listen(PORT, () => {
	console.log("server up and running");
});
