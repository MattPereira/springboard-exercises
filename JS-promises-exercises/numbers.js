////////////// PART ONE: NUMBER FACTS ////////////////

// Make request to Numbers API to get single fact about favorite number
let favNum = 11;
let baseURL = "http://numbersapi.com";
axios.get(`${baseURL}/${favNum}?json`).then((res) => {
  console.log(res.data);
});

//Get data on multiple numbers in a single request. When data comes back, put all number facts on page
let batchReq = "1..5,11";

axios
  .get(`http://numbersapi.com/${batchReq}?json`)
  .then((res) => {
    data = res.data;
    $table = $("table");

    for (let key in data) {
      const $row = $(`<tr>
                        <td>${key}</td>
                        <td>${data[key]}</td>
                    </tr>`);

      $("table").append($row);
    }
  })
  .catch((err) => console.log(err));

// Use Number API to get 4 facts on my favorite number and put them all on the page. Make multiple request for this
let fourFacts = [];

for (let i = 0; i < 4; i++) {
  fourFacts.push(axios.get("http://numbersapi.com/11?json"));
}

Promise.all(fourFacts)
  .then((factArr) =>
    factArr.forEach((el) => {
      $("ul").append($(`<li>${el.data.text}</li>`));
    })
  )
  .catch((err) => console.log(err));
