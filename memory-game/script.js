const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  //click card to change background color to class attribute
  const cardColor = event.target.getAttribute("class");
  event.target.style.backgroundColor = cardColor;

  //prevente users from flipping over more than two cards at a time

  const cards = document.querySelectorAll("div");
  let tracker = [];

  for (let i = 0; i < cards.length; i++) {
    let bgColor = cards[i].getAttribute("style");
    if (bgColor) {
      tracker.push(bgColor);
      console.log(tracker);
    }

    for (let j = 0; j < tracker.length; j++) {
      if (tracker.length > 1 && tracker[j] === tracker[j + 1]) {
        console.log("That is a match!");
      } else if (tracker[j] !== tracker[j + 1] && tracker.length > 1) {
        document.body.style.pointerEvents = "none";
        console.log("not a match!");
        setTimeout(function () {
          console.log("flip them back!");
          event.target.style.backgroundColor = "";
        }, 2000);
      }
    }
  }
}

//how to flip back over cards that dont match?

// when the DOM loads
createDivsForColors(shuffledColors);
