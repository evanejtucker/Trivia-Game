$(document).ready(function(){

// Global Variables
// ----------------------------------------------------------------------------------------------------

    var questionOptions =[];
    var selectedQuestion;
    let startingTime = 20;
    var intervalID;

// Functions
// ----------------------------------------------------------------------------------------------------

    // function to push data to an array
    var loopPush = (data, arr) => {
        for (var i=0; i<data.length; i++) {
            arr.push(data[i]);
        } return arr;
    }

    // set question to be displayed
    var setSelectedQuestion = () => {
        selectedQuestion = questionOptions[Math.floor(Math.random() * questionOptions.length)];
        console.log(selectedQuestion);
    }

    // start the clock
    var startTimer = () => {
        intervalID = setInterval(runningTime, 1000);
    }

    // reduce the time, and updata the dom
    var runningTime = () => {
        startingTime--;
        console.log(startingTime);

        endTimer();
    }

    // end timer if starting time is 0, and set it back to 20
    var endTimer = () => {

        if (startingTime === 0) {
            clearTimeout(intervalID);
            startingTime = 20;
            console.log("time is out");
        }
    }


// Main Process
// ----------------------------------------------------------------------------------------------------

    $.get( "/options", function(data) {

        loopPush(data, questionOptions);

    }).then(function() {

        console.log(questionOptions);
        setSelectedQuestion();
        startTimer();
    });




});