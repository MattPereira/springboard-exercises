class Cupcake {
  constructor() {
    this.showCakes();

    $("#cakeList").on("click", "#delete", this.deleteCake);
    $("#search-form").on("submit", this.searchCakes.bind(this));
    $("#newCakeForm").on("submit", this.addCake.bind(this));
  }

  async showCakes() {
    const res = await axios.get("/api/cupcakes");

    for (let cupcake of res.data.cupcakes) {
      let $cake = $(this.genCakeHTML(cupcake));
      $("#cakeList").append($cake);
    }
  }

  async addCake(event) {
    event.preventDefault();

    const formData = $("#newCakeForm").serializeArray();

    const data = {
      flavor: formData[1].value,
      size: formData[2].value,
      rating: formData[3].value,
      image: formData[4].value,
    };

    const res = await axios.post("/api/cupcakes", data);

    let newCake = $(this.genCakeHTML(res.data.cupcake));
    $("#cakeList").append(newCake);

    $("#newCakeForm")[0].reset();
  }

  async deleteCake() {
    const id = $(this).data("id");

    const res = await axios.delete(`/api/cupcakes/${id}`);

    $(this).parent().remove();
  }

  async searchCakes(event) {
    event.preventDefault();

    let $term = $("#search").val();

    const res = await axios.get(`/api/search?search=${$term}`);

    $("#cakeList").empty();

    let searchCake = $(this.genCakeHTML(res.data.cupcake));
    $("#cakeList").append(searchCake);
  }

  genCakeHTML(cupcake) {
    return `<div class="col-md-4 mb-4">
                  <h5 class="text-center">${cupcake.size} ${cupcake.flavor}</h5>
                  <p class="lead text-center">Rating: ${cupcake.rating}</p>
                  <img src="${cupcake.image}" class="img-fluid">
                  <button class="btn btn-danger" id="delete" data-id="${cupcake.id}">DELETE</button>
            </div>`;
  }
}

// $(document).ready(showCakes);

// async function showCakes() {
//   const res = await axios.get("/api/cupcakes");

//   for (let cupcake of res.data.cupcakes) {
//     let $cake = $(genCakeHTML(cupcake));
//     $("#cakeList").append($cake);
//   }
// }

// $("#newCakeForm").on("submit", addCake);

// async function addCake(event) {
//   event.preventDefault();

//   formData = $("form").serializeArray();
//   console.log(formData);
//   data = {
//     flavor: formData[0].value,
//     size: formData[1].value,
//     rating: formData[2].value,
//     image: formData[3].value,
//   };

//   const res = await axios.post("/api/cupcakes", data);

//   let newCake = $(genCakeHTML(res.data.cupcake));
//   $("#cakeList").append(newCake);
// }

// $("#cakeList").on("click", "#delete", deleteCake);

// async function deleteCake() {
//   const id = $(this).data("id");

//   // Delete cupcake from database
//   const res = await axios.delete(`/api/cupcakes/${id}`);

//   $(this).parent().remove();
// }

// $("#search").on("submit", searchCakes);

// async function searchCakes(event) {
//   event.preventDefault();
//   $term = $("#search-term").val();

//   //hit server route
//   const res = await axios.get(`/api/search?search=${$term}`);

//   $("#cakeList").empty();

//   let searchCake = $(genCakeHTML(res.data.cupcake));
//   $("#cakeList").append(searchCake);
// }

// function genCakeHTML(cupcake) {
//   return `<div class="col-md-4 mb-4">
//                 <h5 class="text-center">${cupcake.size} ${cupcake.flavor}</h5>
//                 <p class="lead text-center">Rating: ${cupcake.rating}</p>
//                 <img src="${cupcake.image}" class="img-fluid">
//                 <button class="btn btn-danger" id="delete" data-id="${cupcake.id}">DELETE</button>
//           </div>`;
// }
