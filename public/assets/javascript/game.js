$(document).ready(function(){

// Global Variables
// ----------------------------------------------------------------------------------------------------

    var questionOptions =[];
    var selectedQuestion;

// Functions
// ----------------------------------------------------------------------------------------------------

    // function to push data to an array
    var loopPush = (data, arr) => {
        for (var i=0; i<data.length; i++) {
            arr.push(data[i]);
        } return arr;
    }

    var setSelectedQuestion = () => {
        selectedQuestion = questionOptions[Math.floor(Math.random() * questionOptions.length)];
        console.log(selectedQuestion);
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