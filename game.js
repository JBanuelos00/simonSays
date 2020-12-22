// Initialize variables required
const btnColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userPattern = [];

let started = false;
let randomChosenColor;
let level;

$(document).keydown(function(event) {
  if(started === false) {
    started = true;
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
})

// User click effects and pattern creation
$(".btn").on("click", function() {
  // Created an on click event listener that will store this id in a variable
  let btnId = this.id;
  // Animate clicked button and play the correct sound effect
  btnAnimation(btnId);
  playSound(btnId);
  // Push the selection into userPatter array for later comparison
  userPattern.push(btnId);
});

// Create a function to set a pattern and loop through it
function nextSequence() {
  // generate a random number between 0-3
  let randomNumber = Math.floor(Math.random() * 4);

  level = 1;

  $("#level-title").text("Level " + level);
  // Now set a random color from the colors array using the random numbers
  randomChosenColor = btnColors[randomNumber];
  // Push the random color into the empty gamePattern array
  gamePattern.push(randomChosenColor);

  for(i = 0; i < gamePattern.length; i++) {
    let color = gamePattern[i];
    arrayLoop(color, i);
  }

  level++
  console.log(level);

  // console.log(gamePattern);

}

// function to check the answer of the user against the generated gamePattern
function checkAnswer() {
  // take user input array and compare vs gamePattern
  //give WRONG if a input is provided that doesn't match

  // call nextSequence() after 1000ms, empty user array.
}

// function to loop through the gamePattern array playing animation and sounds
// with a delay so the player can see and hear the pattern
function arrayLoop(color, i) {
  setTimeout(function() {
    btnAnimation(color);
    playSound(color);
  }, 500 * i);
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
