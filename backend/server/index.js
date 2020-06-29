const express = require("express");
const monk = require("monk");
const cors = require("cors");
const { response } = require("express");
const nf = require('node-fetch');
const ObjectId = require('mongodb').ObjectID;

const app = express();
app.use(cors());

//set up mongo client
const MongoClient = require('mongodb').MongoClient;

//get access to cluster with user name and password
const uri = "mongodb+srv://ezra_test:QYruuDt8cxR36XM8@cluster0-sa1ei.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";

//params for the mongoclient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

  //query into the collection
  const collection = client.db("movie_information").collection("word_statistics");

    //get request for any word
    app.get("/:word", (req, res) => {
        
        const word = req.params.word;

        const getData = async() =>{

            // search the database (collection) for all entries with the 'word' route paramter
            const data = collection.find({ [word]: {$exists: true}}).toArray();
            return data;
        }

        //Send data back to the client once recieved
        getData().then(data => res.send(data)); 
        
    }),

    app.get("/", (req, res) => {
        res.json({
            myMessage: "sample response at root"
        });
    });
    
//   client.close();
});

app.listen(5000, () => {
    console.log("listening on 5000");
});