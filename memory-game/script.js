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

//initialize cardPair array outside of clicker function lol
let cardPairs = [];

// TODO: Implement this function!
function handleCardClick(event) {
  // FLIP THE CARD
  const cardColor = event.target.getAttribute("class");
  event.target.style.backgroundColor = cardColor;
  event.target.classList.add("clicked");

  //KEEP MATCHES FLIPPED
  let cards = document.querySelectorAll("div");
  for (card of cards) {
    if (card.classList.contains("matched")) {
      card.style.backgroundColor = card.classList[0];
    }
  }

  //PREVENT DOUBLE CLICKS
  event.target.style.pointerEvents = "none";

  //DETERMINE IF CARD PAIRS MATCH
  cardPairs.push(event.target.style.backgroundColor);

  if (cardPairs.length === 2 && cardPairs[0] === cardPairs[1]) {
    cardPairs.splice(0, 2);
    for (card of cards) {
      if (card.classList.contains("clicked")) {
        card.classList.replace("clicked", "matched");
      }
    }
  } else if (cardPairs.length === 2 && cardPairs[0] !== cardPairs[1]) {
    cardPairs.splice(0, 2);
    document.body.style.pointerEvents = "none";
    setTimeout(function () {
      for (card of cards) {
        if (card.classList.contains("clicked")) {
          card.style.backgroundColor = "";
          card.style.pointerEvents = "";
          card.classList.remove("clicked");
        }
      }
      document.body.style.pointerEvents = "";
    }, 2000);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
