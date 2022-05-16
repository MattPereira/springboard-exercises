import { useState } from "react";
import axios from "axios";

const useAxios = (BASE_URL) => {
  const [data, setData] = useState([]);

  //add new object of data to array stored in state
  const addResData = async (formatter = (data) => data, urlOption = "") => {
    const response = await axios.get(`${BASE_URL}${urlOption}`);
    setData((data) => [...data, formatter(response.data)]);
  };

  const clearData = () => setData([]);

  return [data, addResData, clearData];
};

export default useAxios;

//CUSTOM HOOK TO REPLACE BOTH SETS OF AXIOS LOGIC!
// const [cards, setCards] = useState([]);
// const addCard = async () => {
//   const response = await axios.get(
//     "https://deckofcardsapi.com/api/deck/new/draw/"
//   );
//   setCards((cards) => [...cards, { ...response.data, id: uuid() }]);
// };

// MUST ACCOUNT FOR NAME!
// const [pokemon, setPokemon] = useState([]);
// const addPokemon = async (name) => {
//   const response = await axios.get(
//     `https://pokeapi.co/api/v2/pokemon/${name}/`
//   );
//   setPokemon((pokemon) => [...pokemon, { ...response.data, id: uuid() }]);
// };
