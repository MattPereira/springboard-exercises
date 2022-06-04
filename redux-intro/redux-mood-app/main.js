// set up store
const store = Redux.createStore(countReducer);

const face = document.getElementById("face");
const happyBtn = document.getElementById("happy");
const sadBtn = document.getElementById("sad");
const stressBtn = document.getElementById("stressed");
const cryBtn = document.getElementById("crying");
const randBtn = document.getElementById("random");

happyBtn.addEventListener("click", function (e) {
  store.dispatch({ type: "HAPPY", payload: "(ﾉ◕ヮ◕)ﾉ" });
});

sadBtn.addEventListener("click", function (e) {
  store.dispatch({ type: "SAD", payload: "(Θ︹Θ)" });
});

stressBtn.addEventListener("click", function (e) {
  store.dispatch({ type: "STRESSED", payload: "ಠ_ಠ" });
});

cryBtn.addEventListener("click", function (e) {
  store.dispatch({ type: "CRYING", payload: "Q.Q" });
});

randBtn.addEventListener("click", function (e) {
  const randIdx = Math.floor(Math.random() * 4);
  const types = ["HAPPY", "SAD", "STRESSED", "CRYING"];
  const faces = ["(ﾉ◕ヮ◕)ﾉ", "(Θ︹Θ)", "ಠ_ಠ", "Q.Q"];

  store.dispatch({ type: types[randIdx], payload: faces[randIdx] });
});

function renderMood() {
  const state = store.getState();
  face.innerHTML = state.face;
  document.body.style.backgroundColor = state.bgColor;
}

renderMood();
store.subscribe(renderMood);
