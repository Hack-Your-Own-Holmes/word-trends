const express = require("express");
const monk = require("monk");
const cors = require("cors");

const app = express();
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ezra_test:QYruuDt8cxR36XM8@cluster0-sa1ei.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("movie_information").collection("word_statistics");
  console.log(collection.find().toArray());

    app.get("/test", (req, res) => {
    // search the database (collection) for all users with the `user` field being the `user` route paramter
    collection.find({ _id: "5ef8a503c265e955a4add08e" }).toArray((err, array) => {
        if (err) {
        // if an error happens
        res.send("Error in GET req.");
        } else {

        console.log(array);
        res.send(test_response); // send back all users found with the matching username
        }
    });
    });
    
//   client.close();
});


// app.get("/", (req, res) => {
//     res.json({
//         myMessage: "sample response"
//     });
// }),


app.listen(5000, () => {
    console.log("listening on 5000");
});
