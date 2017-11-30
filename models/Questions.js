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
    unique: false,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true  
  }

});

QuestionsSchema.path('answers').validate(function(answers){
    if(!answers){return false}
    else if(answers.length < 4){return false}
    return true;
}, 'Must provide 4 answers');

saveToDB = (question) => {
    question.save(function(err) {
        if (err) return console.error(err);
        console.log("Added Successfully!");
    });
};


var Question = mongoose.model("Questions", QuestionsSchema);

module.exports = Question;