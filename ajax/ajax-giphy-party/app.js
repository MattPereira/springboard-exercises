function addGiphy(res) {
  let totalGiphys = res.data.length;
  let randomIdx = Math.floor(Math.random() * totalGiphys);
  let $newCol = $("<div class='col-4 mb-3'></div>");
  let $newGif = $("<img>", {
    src: res.data[randomIdx].images.original.url,
    class: "img-fluid",
  });
  $newCol.append($newGif);
  $("#display-giphy").append($newCol);
}

$("#search-btn").on("click", async function (event) {
  event.preventDefault();

  let searchTerm = $("#search-term").val();
  $("#search-term").val("");
  const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: "5jIa3WAWOCMogvssdCD9IGYqjY9zF79t",
      q: searchTerm,
    },
  });

  addGiphy(res.data);
});

$("#delete-btn").on("click", function () {
  $("display-giphy").empty();
});
