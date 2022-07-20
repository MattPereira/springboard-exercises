function guessingGame() {
  let target = Math.floor(Math.random() * 100);
  let guesses = 0;
  let alreadyWon = false;

  return function guess(num) {
    if (alreadyWon) return `The game is over, you already won!`;

    if (num > target) {
      guesses++;
      return `${num} is too high!`;
    } else if (num < target) {
      guesses++;
      return `${num} is too low!`;
    } else if (num === target) {
      guesses++;
      alreadyWon = true;
      return `You win! You found ${target} in 3 guesses.`;
    }
  };
}

module.exports = { guessingGame };
