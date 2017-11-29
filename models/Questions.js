// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;


var QuestionsSchema = new Schema({

  question: {
    type: String,
    unique: true,
    required: true
  },
  answers: [{
    type: String || Number,
    required: true
  }],
  correctAnswer: {
    type: String,
    unique: true,
    required: true  
  }

});

QuestionsSchema.path('answers').validate(function(answers){
    if(!answers){return false}
    else if(answers.length < 4){return false}
    return true;
}, 'Must provide 4 answers');

var Question = mongoose.model("Questions", QuestionsSchema);

module.exports = Question;