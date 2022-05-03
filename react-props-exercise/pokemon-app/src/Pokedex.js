import React from "react";
import PokeCard from "./Pokecard";
import "./Pokedex.css"

/** Index of Pokemon: show individual cards. */


const Pokedex = (props) => {

  let winMessage = null;
  let styles = null;
  if(props.isWinner) {
    winMessage = <p className="Pokedex-winner"> THIS HAND WINS!</p>;
    styles= {backgroundColor: "#5acc45"}
  } else {
    styles = {backgroundColor: '#bf3f3f'}
  }
  
  return (
    <div className="Pokedex" style={styles}>
      <h1 className="Pokedex-title">Player {props.handId}</h1>
      <div className="Pokedex-cards">
        {props.pokemon.map((p) => (
          <PokeCard 
            key={p.id}
            id={p.id}
            name={p.name}
            type={p.type}
            exp={p.base_experience}
          />
        ))}
      </div>

      <h4 className="Pokedex-handExp">TOTAL EXPERIENCE {props.handExp}</h4>
      <h5 className="Pokedex-winMessage">{winMessage}</h5>
    </div>
  );
}



export default Pokedex;
