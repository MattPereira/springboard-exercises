class Boggle {
  constructor() {
    this.seconds = 60;
    this.score = 0;
    this.words = new Set();
    this.showCountdown();

    // every 1000 msec, run this.countdown()
    this.countdown = setInterval(this.countdown.bind(this), 1000);

    $("#add-word").on("submit", this.handleGuess.bind(this));
  }

  //flash a message in DOM with dynamic alert-type
  showMessage(msg, type) {
    $("#msg").text(msg).removeClass().addClass(`alert alert-${type}`);
  }

  //show correctly guessed words in DOM
  showWords(word) {
    $("#word-bank").append(`<h5>${word}<h5>`);
  }

  //show score in DOM
  showScore(score) {
    $("#currScore").text(score);
  }

  //Updates the countdown in the DOM
  showCountdown() {
    $("#countdown").text(this.seconds);
  }

  // Count down each second of game
  async countdown() {
    this.seconds -= 1;
    this.showCountdown();

    if (this.seconds === 0) {
      clearInterval(this.countdown);
      await this.endGame();
    }
  }

  // handle submission of word to boggle game
  async handleGuess(evt) {
    evt.preventDefault();

    console.log(this);

    const $word = $("#word");
    let word = $word.val();

    // prevent submitting word that is already in word bank
    if (this.words.has(word)) {
      this.showMessage(`${word} has already been guessed!`, "danger");
      $word.val("");
      return;
    }

    // make get request using submitted word and handle rresponse from from server
    const res = await axios.get("/validate-word", { params: { word: word } });
    if (res.data.result === "not-word") {
      this.showMessage(`${word} is not a valid word`, "danger");
    } else if (res.data.result === "not-on-board") {
      this.showMessage(`${word} is valid, but is not on board`, "warning");
    } else {
      this.showMessage(`Congratulations ${word} is on the board!`, "success");
      this.score += word.length;
      this.words.add(word);
      this.showWords(word);
      this.showScore(this.score);
    }

    $word.val("");
  }

  async endGame() {
    // DOM  changes while data sent to server
    $("#endGame")
      .html("<h3>Loading</h3><h3>New Game</h3>")
      .removeClass("bg-primary")
      .addClass("bg-danger");

    $("#add-word").hide();

    //post current game score to score-keeper route
    const res = await axios.post("/score-keeper", { score: this.score });
    console.log(res);
    if (res.data.newRecord) {
      this.showMessage(`New record: ${this.score}`, "success");
    } else {
      this.showMessage(`YOUR FINAL SCORE IS ${this.score}`, "warning");
    }

    //reload page after 5 seconds to initiate start of a new game
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
}
