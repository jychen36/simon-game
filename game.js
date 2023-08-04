const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keydown", function(){
    if(!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    var randNum = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randNum];

    userClickedPattern = [];

    level++;
/*     console.log(level); */
    $("h1").text("Level " + level);
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);    
}



function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play(); 
}

function animatePress(currColor){
    $("#"+currColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currLevel) {
    if (userClickedPattern[currLevel] == gamePattern[currLevel]){
/*         console.log("success"); */

        if(userClickedPattern.length == gamePattern.length) {
            setTimeout(function(){
                nextSequence();
                
            }, 1000);
        }

    } else {
/*         console.log("wrong"); */
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}