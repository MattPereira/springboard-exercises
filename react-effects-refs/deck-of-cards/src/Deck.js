import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deckId, setDeckId] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerId = useRef(null);

  //At mount: Grab deckId from API and put it in state ONE TIME after first render
  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
      setDeckId(res.data.deck_id);
    }

    getDeck();
  }, []);

  //Draw one card every second if autoDraw is true
  useEffect(() => {
    async function getCard() {
      try {
        const drawRes = await axios.get(`${API_BASE_URL}/${deckId}/draw/`);

        const card = drawRes.data.cards[0];

        setDrawn((d) => [
          ...d,
          {
            id: card.code,
            name: `${card.value} of ${card.suit}`,
            image: card.image,
          },
        ]);

        if (drawRes.data.remaining === 0) {
          setAutoDraw(false);
          throw new Error("NO CARDS LEFT IN THE DECK!");
        }
      } catch (err) {
        alert(err);
      }
    }
    //if true && timerId.current === null
    if (autoDraw && timerId.current === null) {
      //store the intervalID value in timerRef.current (useRef)
      timerId.current = setInterval(async () => {
        await getCard();
      }, 1000);
    }
    //clean up
    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
    };
  }, [autoDraw, drawn, deckId]);

  const toggleAutoDraw = () => {
    setAutoDraw((auto) => !auto);
  };

  const shuffleDeck = () => {
    setDrawn([]);

    async function shuffleDeck() {
      await axios.get(`${API_BASE_URL}/${deckId}/shuffle/`);
    }

    shuffleDeck();
  };

  //Create a card component for each drawn card
  const cards = drawn.map((c) => (
    <Card key={c.id} name={c.name} image={c.image} />
  ));

  return (
    <div className="Deck">
      {deckId ? (
        <div>
          <button className="Deck-draw" onClick={toggleAutoDraw}>
            {autoDraw ? "STOP" : "START"} DRAWING
          </button>
          <button className="Deck-shuffle" onClick={shuffleDeck}>
            Shuffle Deck
          </button>
        </div>
      ) : null}
      {drawn.length}
      <div className="Deck-cards">{cards}</div>
    </div>
  );
};

export default Deck;
