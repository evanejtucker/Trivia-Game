

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


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

    var q1 = new Questions({question: "Who was the First President of the United States?", answers: ["George Washington", "John Adams", "Thomas Jefferson", "Alexander Hamilton"], correctAnswer: "George Washington"});
    var q2 = new Questions({question: "When was the constitution written?", answers: ["1776", "1807", "1787", "1782"], correctAnswer: "1787"});

    // saveToDB(q2);

});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
});


app.get('/options', function (req, res) {
    Questions.find(function(err, question) {
        if (err) return console.error(err);
        res.send(question);
    })
});


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});
