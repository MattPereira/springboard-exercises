$(document).ready(showCakes);

async function showCakes() {
  const res = await axios.get("/api/cupcakes");

  for (let cupcake of res.data.cupcakes) {
    let $cake = $(genCakeHTML(cupcake));
    $("#cakeList").append($cake);
  }
}

$("#newCakeForm").on("submit", addCake);

async function addCake(event) {
  event.preventDefault();

  formData = $("form").serializeArray();

  data = {
    flavor: formData[0].value,
    size: formData[1].value,
    rating: formData[2].value,
    image: formData[3].value,
  };

  res = await axios.post("/api/cupcakes", data);

  let newCake = $(genCakeHTML(res.data.cupcake));
  $("#cakeList").append(newCake);
}

function genCakeHTML(cupcake) {
  return `<div class="col-md-4 mb-4">
                <h5 class="text-center">${cupcake.size} ${cupcake.flavor}</h5>
                <p class="lead text-center">Rating: ${cupcake.rating}</p>
                <img src="${cupcake.image}" class="img-fluid">
          </div>`;
}
