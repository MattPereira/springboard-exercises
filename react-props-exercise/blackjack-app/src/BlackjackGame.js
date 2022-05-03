import React from "react"
import Card from "./Card"
import Score from "./Score"

/* Get a random element from an array*/
function choice(values) {
    const randIdx = Math.floor(Math.random() * values.length)
    return values[randIdx];
}

/* Get a random card value and suit from card data. */
function getCard(values, suits) {
    let randValue = choice(values);
    let randSuit = choice(suits);
    return randValue + randSuit
}

/* Get numCards random cards, with no duplicates*/
function getCards(values, suits, numCards=1) {
    const cardsArr = [getCard(values,suits)];
    while(cardsArr.length < numCards) {
        let randCard = getCard(values, suits);
        if(!cardsArr.includes(randCard)) cardsArr.push(randCard);
    }
    return cardsArr;
}

/* Main game component*/
const BlackjackGame = (props) => {
    const pairOfCards = getCards(props.values, props.suits, 2)
    return (
        <div className="row justify-content-center text-center">
            <Card cardId={pairOfCards[0]}/>
            <Card cardId={pairOfCards[1]}/>
            <Score cards={pairOfCards}/>
        </div>
        )
}


BlackjackGame.defaultProps = {
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"],
    suits: ["C", "D", "H", "S"]
}

export default BlackjackGame;