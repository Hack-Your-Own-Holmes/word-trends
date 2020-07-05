var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
    let filenames = fs.readdirSync(dirname);
    filenames.forEach(function (filename) {
        let rawdata = fs.readFileSync(dirname + filename);
        onFileContent(filename, JSON.parse(rawdata));
    });
}

var data = {};
readFiles('scripts/', function (filename, content) {
    let { genre, title, date, script } = content;
    cleaned_script_words = script.replace(/[^a-zA-Z \n]/g, '').split(/[\s\n]+/);
    let words = {}
    for (var i = 0; i < cleaned_script_words.length; i++) {
        words[cleaned_script_words[i].toLowerCase()] = (words[cleaned_script_words[i].toLowerCase()] || 0) + 1;
    }
    year = new Date(date).getFullYear()
    for (let word in words) {
        if (word in data) {
            if (year in data[word]) {
                if (genre in data[word][year]["movies"]) {
                    data[word][year]["movies"][genre][title] = words[word]
                } else {
                    data[word][year]["movies"][genre] = {
                        [title]: words[word]
                    }
                }
            } else {
                data[word][year] = {
                    "movies": {
                        [genre]: {
                            [title]: words[word]
                        }
                    }
                }
            }
        } else {
            data[word] = {
                [year]: {
                    "movies": {
                        [genre]: {
                            [title]: words[word]
                        }
                    }
                }
            }
        }
    }
}, function (err) {
    throw err;
});

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("movie_information").collection("word_statistics");
    // perform actions on the collection object
    let list = Array()
    for (let key in data) {
        list.push({ [key]: data[key] })
    }
    let i = 0;
    while (i + 10 < list.length) {
        collection.insertMany(list.slice(i, i + 10), function (err, result) {
            if (err) {
                console.log(err)
            }
            console.log("Inserted documents into the collection");
        });
        i += 10
    }


    client.close();
});