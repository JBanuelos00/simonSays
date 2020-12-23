// Initialize variables required
const btnColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userPattern = [];

let started = false;
let level = 0;

$(document).keydown(function(event) {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// User click effects and pattern creation
$(".btn").on("click", function() {
  // Created an on click event listener that will store this id in a variable
  let btnColorId = $(this).attr("id");
  // Push the selection into userPatter array for later comparison
  userPattern.push(btnColorId);
  // Animate clicked button and play the correct sound effect
  btnAnimation(btnColorId);
  playSound(btnColorId);

  checkAnswer(userPattern.length-1);
});

// Create a function to set a pattern and loop through it
function nextSequence() {
  // Clear userPattern for next sequence
  userPattern = [];
  // increase the level by 1
  level++
  $("#level-title").text("Level " + level);
  // generate a random number between 0-3
  let randomNumber = Math.floor(Math.random() * 4);
  // Now set a random color from the colors array using the random numbers
  let randomChosenColor = btnColors[randomNumber];
  // Push the random color into the empty gamePattern array
  gamePattern.push(randomChosenColor);

  for(let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      patternLoop(gamePattern[i]);
    }, 500 * i)
  }
  // btnAnimation(randomChosenColor);
  // playSound(randomChosenColor);
}

// function to check the answer of the user against the generated gamePattern
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userPattern[currentLevel]) {
    if(userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }

}

// create a function that will animate the appropriate button
function btnAnimation(name) {
    // take the argument and select the id of the button to add a class
  $("#" + name).addClass("pressed")
  // set the timeout to 50ms to remove the class finishing the animation
  setTimeout(function() {
    $("#" + name ).removeClass("pressed")
  }, 100);
}

// create a function that will play the sound of the appropirate button
function playSound(name) {
  // Allow the sound to be set dependent on which btn was clicked
  let btnSound = new Audio("sounds/" + name +".mp3");
  btnSound.play();
}

function patternLoop(pattern) {
  btnAnimation(pattern);
  playSound(pattern);
}

function gameOver() {
  // change h1 to say "Game Over, Press Any Key to Restart"
  $("#level-title").text("Game Over, Press Any Key to Restart!");
  // add class game-over to body
  $("body").addClass("game-over");
  // setTimeout to remove class after 200ms
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200)
  // play wrong sound
  playSound("wrong");

  startOver();
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
