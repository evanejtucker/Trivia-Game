

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
    var q3 = new Questions({question: "Which one of these was NOT one of the thirteen original colonies?", answers: ["Maine","Deleware","New Hampshire","Georgia"], correctAnswer: "Maine"});
    var q4 = new Questions({question: "Who is the Cheif Justice of the United States now?", answers: ["John Roberts","Rex Tillerson","James Mattis","Jeff Sessions"], correctAnswer: "John Roberts"});
    var q5 = new Questions({question: "What territory did the Unites States buy from France in 1803?", answers: ["Louisiana","Northwest","California","Mississippi"], correctAnswer: "Louisiana"});
    var q6 = new Questions({question: "Before he was president, Eissenhower was a general.  What war did he fight in?", answers: ["World War II","Korean War","World War I","Vietnam War"], correctAnswer: "World War II"});
    var q7 = new Questions({question: "How many amendements does the constitution have?", answers: ["Twenty Seven (27)","Ten (10)","Thirteen (13)","Twenty Three (23)"], correctAnswer: "Twenty Seven (27)"});
    var q8 = new Questions({question: "How many Justices are on the Supreme Court?", answers: ["Nine (9)","Thirteen (13)","Three (3)","Seven (7)"], correctAnswer: "Nine (9)"});
    var q9 = new Questions({question: "Who wrote the Decleration of Independence?", answers: ["Thomas Jefferson","Alexander Hamilton","John Hancock","John Adams"], correctAnswer: "Thomas Jefferson"});
    var q10 = new Questions({question: "If both the President, and the Vice President can no longer serve, who becomes President?", answers: ["The Speaker of the House","Secretary of State","Secretary of Defense","Attorney General"], correctAnswer: "The Speaker of the House"});
    var q11 = new Questions({question: "The House of Representatives has how many voting members?", answers: ["Four Hundred Thirty-Five (435)","One Hundred (100)","Four Hundred Fifteen (415)","Two Hundred Thirty Seven (237)"], correctAnswer: "Four Hundred Thirty-Five (435)"});
    saveToDB(q8);
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
