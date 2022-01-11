const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
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

let cardPairs = [];
let guessCount = [];
let matchCount = [];
let lowScore;

document.addEventListener("click", function () {
  // WINNER DISPLAY
  if (matchCount.length === 6) {
    const winner = document.createElement("h2");
    winner.innerText = "WINNER WINNER CHICKEN DINNER";

    const scoreBoard = document.getElementById("score-board");
    scoreBoard.append(winner);
  }
  //Store the lowest-scoring game in local storage, so that players can see a record of the best game played.

  //STILL NEEDS MORE WORK
  //WHEN THE PAGE REFRESHES THE localStorage.lowScore gets set to empty string. why?

  if (localStorage.lowScore === undefined && matchCount.length === 6) {
    localStorage.setItem("lowScore", guessCount.length);
  }

  let currentGameScore = document.getElementById("guess").innerText;

  if (Number(localStorage.lowScore) > currentGameScore) {
    localStorage.setItem("lowScore", currentGameScore);
  }

  let lowestGameScore = document.getElementById("lowest");
  lowestGameScore.innerText = "hello";
});

// TODO: Implement this function!
function handleCardClick(event) {
  // FLIP THE CARD

  const cardColor = event.target.getAttribute("class");
  event.target.style.backgroundColor = cardColor;
  event.target.classList.add("clicked");

  //PREVENT DOUBLE CLICKS
  event.target.style.pointerEvents = "none";

  //KEEP MATCHES FLIPPED
  let cards = document.querySelectorAll("div");
  for (card of cards) {
    if (card.classList.contains("matched")) {
      card.style.backgroundColor = card.classList[0];
    }
  }

  //DETERMINE IF CARD PAIRS MATCH
  cardPairs.push(event.target.style.backgroundColor);

  if (cardPairs.length === 2 && cardPairs[0] === cardPairs[1]) {
    matchCount.push(cardPairs.splice(0, 2));
    for (card of cards) {
      if (card.classList.contains("clicked")) {
        card.classList.replace("clicked", "matched");
      }
    }
  } else if (cardPairs.length === 2 && cardPairs[0] !== cardPairs[1]) {
    guessCount.push(cardPairs.splice(0, 2));
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
    }, 1000);
  }

  //For every guess made, increment a score variable and display the score while the game is played
  let currentGameScore = guessCount.length;

  const score = document.querySelector("#guess");
  score.innerText = currentGameScore;
}

//IF YOU WIN!

// when the DOM loads
createDivsForColors(shuffledColors);

//FURTHER STUDY
//Add a button to start game

const startBtn = document.getElementById("start-button");
const restartBtn = document.getElementById("restart-button");

startBtn.addEventListener("click", function (evt) {
  const game = document.getElementById("game-board");

  game.classList.remove("d-none");
  startBtn.classList.add("d-none");
  restartBtn.classList.remove("d-none");
});

restartBtn.addEventListener("click", function () {
  window.location.reload();
});

// Allow for any number of cards to appear

//Instead of hard-coding colors, try something different like random colors or even images!
