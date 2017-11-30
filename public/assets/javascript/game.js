$(document).ready(function(){

// Global Variables
// ----------------------------------------------------------------------------------------------------

    var questionOptions = [];
    var usedQuestions = [];
    var selectedQuestion;

    let startingTime = 20;
    var intervalID;

    var wins = 0;
    var loses = 0;
    
    // used to count how many questions the user has answered
    var roundCounter = 0;

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

        if(questionOptions.length === 0) {
            questionOptions = usedQuestions;
            console.log("You havegone through all questions")
        }

        selectedQuestion = questionOptions.splice(Math.floor(Math.random() * questionOptions.length), 1)[0];
        usedQuestions.push(selectedQuestion);
    }

    // update the timer in the dom
    var updateTimer = () => {
        $("#timer").text(startingTime);
    }

    // start the clock
    var startTimer = () => {
        endTimer();
        startingTime = 20;
        intervalID = setInterval(runningTime, 1000);
    }

    // reduce the time, and updata the dom
    var runningTime = () => {
        
        updateTimer();
        if (startingTime <= 0) {
            loses++;
            startGame();
        }
        startingTime--;
    }

    // end timer if starting time is 0, and set it back to 20
    var endTimer = () => {
        clearInterval(intervalID);
        updateTimer();
    }

    // displays questions and answers
    var displayQuestion = (question) => {

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
            if (this.value === removeSpaces(question.correctAnswer)) {
                wins++;
                startGame();
            } else {
                loses++;
                startGame();
            }

        });
    }

    // clears question data
    var clearDisplayedQuestion = () => {
        $("#question").empty();
        $("#answers").empty();
    }

    // update wins and loses in the dom
    var updateScores = () => {
        $("#wins").html("Correct: " + wins);
        $("#loses").text("Incorect: " + loses);
    }

    // initailizes each round in the game
    var startGame = () => {
        roundCounter++;
        updateScores();
        startTimer();
        clearDisplayedQuestion();
        setSelectedQuestion();
        displayQuestion(selectedQuestion);  
    }


// Main Process
// ----------------------------------------------------------------------------------------------------

    $.get( "/options", function(data) {

        loopPush(data, questionOptions);

    }).then(function() {

        $("#startGame").on("click", startGame);

    });




});