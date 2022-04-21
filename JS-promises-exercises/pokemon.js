baseURL = "https://pokeapi.co/api/v2/pokemon/?limit=1126";

//1 request to Pokemon API to get names and URLS for all pokemon in database
axios.get(`${baseURL}`).then((res) => {
  pokemon = res.data.results;
  //   pokemon.forEach((el) => console.log(el.name, el.url));
});

//2 request to Pokemon API to console.log data about 3 random pokemon

axios
  .get(`${baseURL}`)
  .then((res) => {
    let randPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * res.data.results.length);
      let url = res.data.results.splice(randomIdx, 1)[0].url;
      randPokemonUrls.push(url);
    }
    return Promise.all(randPokemonUrls.map((el) => axios.get(el)));
  })
  .then((pokemon) => {
    pokemon.forEach((p) => console.log(p));
  });

//3 console.log name of pokemon along with description
let names = null;
axios
  .get(`${baseURL}`)
  .then((res) => {
    let randPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * res.data.results.length);
      let url = res.data.results.splice(randomIdx, 1)[0].url;
      randPokemonUrls.push(url);
    }
    return Promise.all(randPokemonUrls.map((el) => axios.get(el)));
  })
  .then((pokemon) => {
    names = pokemon.map((p) => p.data.name);
    return Promise.all(pokemon.map((p) => axios.get(p.data.species.url)));
  })
  .then((res) => {
    console.log(res);
    let descriptions = res.map((r) => {
      let descriptionObj = r.data.flavor_text_entries.find(
        (entry) => (entry.language.name = "en")
      );
      return descriptionObj
        ? `${descriptionObj.flavor_text} ${descriptionObj.language.name}`
        : "no descripton available";
    });
    descriptions.forEach((desc, i) => {
      console.log(`${names[i]}: ${desc}`);
    });
  });

// 4.
let $btn = $("button");
let $pokeArea = $("#pokemon-area");

$btn.on("click", function () {
  $pokeArea.empty();
  let namesAndImages = [];
  $.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then((data) => {
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      return Promise.all(randomPokemonUrls.map((url) => $.getJSON(url)));
    })
    .then((pokemonData) => {
      namesAndImages = pokemonData.map((p) => ({
        name: p.name,
        imgSrc: p.sprites.front_default,
      }));
      return Promise.all(pokemonData.map((p) => $.getJSON(p.species.url)));
    })
    .then((speciesData) => {
      speciesData.forEach((d, i) => {
        let descriptionObj = d.flavor_text_entries.find(function (entry) {
          return entry.language.name === "en";
        });
        let description = descriptionObj ? descriptionObj.flavor_text : "";
        let { name, imgSrc } = namesAndImages[i];
        $pokeArea.append(makePokeCard(name, imgSrc, description));
      });
    });
});

function makePokeCard(name, imgSrc, description) {
  return `
      <div class="card">
        <h1 class="text-center">${name}</h1>
        <img src=${imgSrc} class="img-fluid" />
        <p>${description}</p>
      </div>
    `;
}
