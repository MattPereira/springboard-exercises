import React from "react";
import "./Pokecard.css"

const POKE_IMG_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

const Pokecard = ({id, name, type, exp}) =>  {
    let imgSrc = `${POKE_IMG_URL}${id}.png`

    const variant = {normal: "grey", electric: "yellow", poison: "limegreen", bug: "darkgreen", flying: "lightblue", fire: "red", water: "royalblue"}

    let styles = {border: `5px solid ${variant[type]}`}

    return (
    <div className="Pokecard" style= {styles}>
        <div className="Pokecard-title">{name}</div>
        <img className="Pokecard-image" src={imgSrc} alt={name}/>
        <div className="Pokecard-data">Type: {type}</div>
        <div className="Pokecard-data">EXP: {exp}</div>
    </div>
    );
}

export default Pokecard;
