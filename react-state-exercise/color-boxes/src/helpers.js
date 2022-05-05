function choice(arr) {
  let randIdx = Math.floor(Math.random() * arr.length);
  return arr[randIdx];
}

export default choice;
