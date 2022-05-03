import React from "react"



const Card = (props) => {
    return (
        <div className="col-auto">
            <img src={`https://deckofcardsapi.com/static/img/${props.cardId}.png`}/>
        </div>
    )
}


export default Card;