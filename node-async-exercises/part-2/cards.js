////////////// PART TWO: DECK OF CARDS ////////////////
$(function () {
  const baseURL = "http://deckofcardsapi.com/api/deck/";

  // Request a single card from a newly shuffled deck, then console.log the card.value and card.suit

  async function part1() {
    let res = await axios.get(`${baseURL}new/draw/?count=1`);
    let { value, suit } = res.data.cards[0];
    console.log(`${value} of ${suit}`);
  }

  // Request single card from newly shuffled deck, then request again to get one more card from SAME deck
  async function part2() {
    let firstCardRes = await axios.get(`${baseURL}/new/draw/?count=1`);
    let deck_id = firstCardRes.data.deck_id;
    let secondCardRes = await axios.get(`${baseURL}/${deck_id}/draw/?count=1`);
    [firstCardRes, secondCardRes].forEach((el) => {
      let { suit, value } = el.data.cards[0];
      console.log(`${value} of ${suit}`);
    });
  }
  // Create new deck from API, listen for button push to draw card and display on page until no cards left in deck of 52
  async function drawCards() {
    let $btn = $("button");
    let $cardShow = $("#card-show");

    let res = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
    let deckId = res.data.deck_id;

    $btn.on("click", async function () {
      let res = await axios.get(`${baseURL}/${deckId}/draw/?count=1`);

      console.log(res.data.remaining);

      let { image: imageSrc } = res.data.cards[0];
      let angle = Math.random() * 90;
      let randomX = Math.random() * 40;
      let randomY = Math.random() * 40;
      $cardShow.append(
        $("<img>", {
          src: imageSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
          },
        })
      );

      if (res.data.remaining === 0) {
        $btn.hide();
      }
    });
  }

  drawCards();
});
