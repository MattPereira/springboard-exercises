/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

const noImageUrl = "http://tinyurl.com/missing-tv";

async function searchShows(query) {
  // Makes an ajax request to the searchShows api. Returns array with object with show id,name, summary and image

  const response = await axios.get("https://api.tvmaze.com/search/shows", {
    params: { q: query },
  });

  const show = response.data[0].show;

  return [
    {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.original : noImageUrl,
    },
  ];
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
           <button class="btn btn-info" id="get-episodes" data-bs-toggle="modal" data-bs-target="#episodeModal">Episodes</button>
           <button class="btn btn-success" id="get-cast" data-bs-toggle="modal" data-bs-target="#castModal">Actors</button>
         </div>
       </div>
      `
    );

    $showsList.append($item);
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  // TODO: return array-of-episode-info, as described in docstring above\\\

  const response = await axios.get(
    `https://api.tvmaze.com/shows/${id}/episodes`
  );

  return response.data;
}

function populateEpisodes(episodesArr) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  for (let episode of episodesArr) {
    let $li = $(
      `<li><em>${episode.name}</em> (season ${episode.season}, episode ${episode.number})</li>`
    );

    $episodesList.append($li);
  }
}

$("#shows-list").on("click", "#get-episodes", async function (evt) {
  $("#episodes-area").css("display", "");

  let showId = $(evt.target).closest(".Show").data("showId");
  let episodes = await getEpisodes(showId);

  populateEpisodes(episodes);
});

async function getCast(id) {
  const response = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`);

  return response.data;
}

function populateCast(castArr) {
  const $castList = $("#cast-list");
  $castList.empty();

  for (let cast of castArr) {
    let $li = $(`<li>${cast.person.name} as '${cast.character.name}'</li>`);

    $castList.append($li);
  }
}

$("#shows-list").on("click", "#get-cast", async function (evt) {
  $("#cast-area").css("display", "");

  let showId = $(evt.target).closest(".Show").data("showId");
  let cast = await getCast(showId);

  console.log(cast);
  populateCast(cast);
});
