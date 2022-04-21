////////////// PART TWO: DECK OF CARDS ////////////////

const baseURL = "http://deckofcardsapi.com/api/deck/";

// Request a single card from a newly shuffled deck, then console.log the card.value and card.suit
axios
  .get(`${baseURL}new/draw/?count=1`)
  .then((res) => {
    [card] = res.data.cards;
    console.log(`DECK ONE: ${card.value} of ${card.suit}`);
  })
  .catch((err) => console.log(err));

// Request a single card from newly shuffled deck, then request to get one more card from SAME DECK. console.log value and suits for both cards
axios
  .get(`${baseURL}/new/draw/?count=1`)
  .then((res) => {
    //grab single card from newly shuffled deck
    [card] = res.data.cards;
    console.log(`DECK TWO: ${card.value} of ${card.suit}`);

    //grab deck id to ask for a second card
    deck_id = res.data.deck_id;

    return axios.get(`${baseURL}/${deck_id}/draw/?count=1`);
  })
  .then((res) => {
    [card] = res.data.cards;
    console.log(`DECK TWO: ${card.value} of ${card.suit}`);
  })
  .catch((err) => console.log(err));

// On page load, create a new deck from API and show a button to allow user to draw card. Everytime button clicked, display a new card until no cards left in deck

$(document).ready(function () {
  let deckId;
  let $btn = $("button");
  let $cardShow = $("#card-show");
  //grab a new deck_id on page load
  axios.get(`${baseURL}/new/shuffle/?deck_count=1`).then((res) => {
    deckId = res.data.deck_id;
  });

  // listen for button push
  $btn.on("click", function () {
    axios
      .get(`${baseURL}/${deckId}/draw/?count=1`)
      .then((res) => {
        //grab card image src
        [card] = res.data.cards;
        let cardImgSrc = card.image;

        //append card img to page
        $cardShow.append(
          $(`<div class="col-1">
                <img src=${cardImgSrc} class="img-fluid mb-3">
            </div>
            `)
        );

        //hide draw a card button if no cards left in deck
        if (res.data.remaining === 0) {
          $(this).hide();
        }
      })
      .catch((err) => console.log(`ALL OUT OF CARDS ${err}`));
  });
});
