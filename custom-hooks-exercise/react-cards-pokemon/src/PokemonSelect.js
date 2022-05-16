import React, { useState } from "react";
import pokemonList from "./pokemonList";
import { choice, formatPokeData } from "./helpers";

/* Select element to choose from common pokemon. */
function PokemonSelect({ add, pokemon = pokemonList, remove }) {
  const [pokeIdx, setPokeIdx] = useState(0);
  const handleChange = (evt) => {
    setPokeIdx(evt.target.value);
  };

  return (
    <div>
      <select onChange={handleChange}>
        {pokemon.map((p, idx) => (
          <option key={idx} value={idx}>
            {p}
          </option>
        ))}
      </select>
      <button onClick={() => add(formatPokeData, pokemon[pokeIdx])}>
        Catch one!
      </button>
      <button onClick={() => add(formatPokeData, choice(pokemon))}>
        I'm feeling lucky
      </button>
      <button onClick={remove}>Remove All Pokemon</button>
    </div>
  );
}

export default PokemonSelect;
