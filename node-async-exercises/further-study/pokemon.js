$(function () {
  let baseURL = "https://pokeapi.co/api/v2/pokemon";

  //1
  async function getAllPokemon() {
    let res = await axios.get(`${baseURL}/?limit=1000`);
    return res.data.results;
  }

  //2
  async function getThreePokemon() {
    let allPokemonData = await getAllPokemon();
    let randPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * allPokemonData.length);
      let url = allPokemonData.splice(randomIdx, 1)[0].url;
      randPokemonUrls.push(url);
    }
    let threePokemonData = await Promise.all(
      randPokemonUrls.map((url) => axios.get(url))
    );
    return threePokemonData;
  }

  //3
  async function getSpeciesData() {
    let pokemonData = await getThreePokemon();
    let speciesData = await Promise.all(
      pokemonData.map((p) => axios.get(p.data.species.url))
    );

    descriptions = speciesData.map((d) => {
      let descriptionObj = d.data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      return descriptionObj
        ? descriptionObj.flavor_text
        : "no description available";
    });
    descriptions.forEach((description, i) => {
      console.log(`${pokemonData[i].data.name}: ${description}`);
    });
    return speciesData;
  }

  //4
  let $btn = $("button");
  let $pokeShow = $("#poke-show");

  $btn.on("click", async function () {
    $pokeShow.empty();

    let pokemonData = await getThreePokemon();
    let speciesData = await getSpeciesData();

    speciesData.forEach((d, i) => {
      let descriptionObj = d.data.flavor_text_entries.find(function (entry) {
        return entry.language.name === "en";
      });
      let description = descriptionObj
        ? descriptionObj.flavor_text
        : "no description";
      let name = pokemonData[i].data.name;
      let imgSrc = pokemonData[i].data.sprites.front_default;
      $pokeShow.append(makePokeCard(name, imgSrc, description));
    });
  });

  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <img src="${imgSrc}" class="card-img-top">
        <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${description}</p>
        </div>
      </div>
      `;
  }
});
