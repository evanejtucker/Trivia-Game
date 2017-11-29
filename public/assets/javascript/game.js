$(document).ready(function(){

// Global Variables
// ----------------------------------------------------------------------------------------------------

    var questionOptions =[];
    var selectedQuestion;
    let startingTime = 20;
    var intervalID;
    var wins = 0;
    var loses = 0;

// Functions
// ----------------------------------------------------------------------------------------------------

    // function to push data to an array
    var loopPush = (data, arr) => {
        for (var i=0; i<data.length; i++) {
            arr.push(data[i]);
        } return arr;
    }

    // randomizes an array
    var shuffleArray = (array) => {
        var shuffled = array.sort(function(a, b){return 0.5 - Math.random()});
        return shuffled;
    }

    // remove spaces from word, used to create values from multiword strings
    var removeSpaces = (word) => {
        var newWord = word.replace(/\s/g, '');
        return newWord;
    }

    // set question to be displayed
    var setSelectedQuestion = () => {
        selectedQuestion = questionOptions[Math.floor(Math.random() * questionOptions.length)];
        displayQuestion(selectedQuestion);
    }

    // update the timer in the dom
    var updateTimer = () => {
        $("#timer").text(startingTime);
    }

    // start the clock
    var startTimer = () => {

        startingTime = 20;
        intervalID = setInterval(runningTime, 1000);
    }

    // reduce the time, and updata the dom
    var runningTime = () => {
        startingTime--;
        updateTimer();
        endTimer();
    }

    // end timer if starting time is 0, and set it back to 20
    var endTimer = () => {

        if (startingTime === 0) {
            clearTimeout(intervalID);
            updateTimer();
        }
    }

    // displays questions and answers
    var displayQuestion = (question) => {

        clearDisplayedQuestion();
        startTimer();

        $("#question").text(question.question);

        shuffleArray(question.answers);

        for (var i=0; i<question.answers.length; i++) {

            let ans = question.answers[i];
            let value = removeSpaces(ans);
            $("#answers").append("<button class='answer' value=" + value + "><h4>" + ans + "</h4></button>");
        }

        userGuess(question);
    }

    var userGuess = (question) => {
        $(".answer").on("click", function() {
            console.log(this.value);
            if (this.value === removeSpaces(question.correctAnswer)) {
                console.log("correct");
                wins++;
            } else {
                console.log("incorrect");
                loses++;
            }
        });
    }

    var clearDisplayedQuestion = () => {
        $("#question").empty();
        $("#answers").empty();
    }


// Main Process
// ----------------------------------------------------------------------------------------------------

    $.get( "/options", function(data) {

        loopPush(data, questionOptions);

    }).then(function() {

        console.log(questionOptions);
        setSelectedQuestion();

    });




});