import uuid from "uuid";

/* Select a random element from values array. */
function choice(values) {
  const randIdx = Math.floor(Math.random() * values.length);
  return values[randIdx];
}

//format response data from Deck of Cards API grabbing only the image url
function formatCardData(data) {
  return {
    id: uuid(),
    image: data.cards[0].image,
  };
}

//format response data from PokeAPI
// {id, front, back, name, stats:[{name, value}, {name, value}, ...]}
function formatPokeData(data) {
  return {
    id: uuid(),
    front: data.sprites.front_default,
    back: data.sprites.back_default,
    name: data.name,
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };
}

export { choice, formatCardData, formatPokeData };
