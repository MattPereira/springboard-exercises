import React from "react"

/* Calculate score for a card*/
function getCardScore(card) {
    const value = card[0];
    if(value === "A") return 11;
    if(["0", "J", "Q", "K"].includes(value)) return 10;
    return +value;
}

/* Calculate score for a card*/
function getHandScore(cards) {
    let total = 0;
    for(let card of cards) {
        total += getCardScore(card)
    }
    return total;
}



const Score = (props) => {

    const score = getHandScore(props.cards);

    return (
        <div className="text-white">
            <h3 className="text-white display-6 my-5">Score: {score}</h3>
            {score === 21 ? <h5 className="display-4">🎉🎉🎉BLACKJACK!!!🎉🎉🎉</h5> : null}
        </div>
    )
}


export default Score;