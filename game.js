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
  let btnColorId = this.id;
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
  btnAnimation(randomChosenColor);
  playSound(randomChosenColor);
}

// function to check the answer of the user against the generated gamePattern
function checkAnswer(currentLevel) {
  if(userPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    setTimeout(function() {
      nextSequence();
    }, 1000 * gamePattern.length);
  } else {
    console.log("wrong");
  }

}

// create a function that will animate the appropriate button
function btnAnimation(name) {
  // pass down the argument for the nested functions lower in scope
  let timeoutId = name;
  // take the argument and select the id of the button to add a class
  $("#" + name).addClass("pressed")
  // set the timeout to 50ms to remove the class finishing the animation
  setTimeout(function() {
    $("#" + timeoutId ).removeClass("pressed")
  }, 100);
}

// create a function that will play the sound of the appropirate button
function playSound(name) {
  // Allow the sound to be set dependent on which btn was clicked
  let btnSound = new Audio("sounds/" + name +".mp3");
  btnSound.play();
}

function reset() {
  // Display Game over
  $("#level-title").text("Game Over");
  // After delay clear all arrays and reset the level-title
  setTimeout(function () {
    started = false;
    gamePattern = [];
    userPattern = [];
    $("#level-title").text("Press A Key to Start");
  }, 2000);
}
