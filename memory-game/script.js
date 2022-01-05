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

//initialize arrays outside of clicker function lol
let cardPairs = [];
let tracker = [];

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const cardColor = event.target.getAttribute("class");
  event.target.style.backgroundColor = cardColor;
  event.target.classList.add("clicked");

  let cards = document.querySelectorAll("div");

  let active = document.getElementsByClassName("clicked");

  if (event.target) {
    event.target.style.pointerEvents = "none";
    cardPairs.push(event.target.style.backgroundColor);
  }

  if (cardPairs.length === 2 && cardPairs[0] === cardPairs[1]) {
    tracker.push(cardPairs.splice(0, 2));
    console.log(active);
    active[0].classList.replace("clicked", "matched");
    active[1].classList.replace("clicked", "matched");
    console.log(tracker);

    //THIS IS THE NEW NEW PLAN. USE MATCHED CLASS TO KEEP CARDS FROM BEING RESET!
    event.target.classList.add("matched");
  } else if (cardPairs.length === 2 && cardPairs[0] !== cardPairs[1]) {
    cardPairs.splice(0, 2);
    document.body.style.pointerEvents = "none";
    setTimeout(function () {
      for (card of cards) {
        if (card.style.pointerEvents === "none") {
          card.style.backgroundColor = "";
          card.style.pointerEvents = "";
          document.body.style.pointerEvents = "";
        }
        // let bgColor = card.getAttribute("style");
        // if (bgColor) {

        // }
      }
    }, 2000);
  }

  for (card of cards) {
    if (card.classList.contains("matched")) {
      card.style.backgroundColor = card.classList[0];
    }
  }
}

//HOW TO KEEP MATCHES FLIPPED OVER?!?!?!

// when the DOM loads
createDivsForColors(shuffledColors);
