function countDown(num) {
  let numArray = [];
  for (let i = num - 1; i >= 0; i--) {
    numArray.push(i);
  }
  for (let i = 0; i < numArray.length; i++) {
    setTimeout(() => {
      if (numArray[i] > 0) {
        console.log(numArray[i]);
      } else {
        console.log("DONE!");
      }
    }, i * 1000);
  }
}

function randomGame() {
  let count = 0;
  function rand() {
    let num = Math.random();
    count += 1;
    console.log(count + " : " + num);
    if (num > 0.75) {
      console.log(`${count} tries before we found a number > 0.75`);
      clearInterval(guess);
    }
  }
  let guess = setInterval(rand, 1000);
}
