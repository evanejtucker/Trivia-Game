

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var options = [];

mongoose.Promise = Promise;

var Questions = require("./models/Questions.js");

var app = express()

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost:27017/trivia", { useMongoClient: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongoose Connection Successful");
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
});

// app.get('/options', function (req, res) {
//     Country.find(function(err, wordOptions) {
//         if (err) return err;
//         res.send(wordOptions)
//     })
// });


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});
