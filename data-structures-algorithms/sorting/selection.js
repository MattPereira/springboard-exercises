function selectionSort(arr) {
  debugger;
  for (let i = 0; i < arr.length - 1; i++) {
    let lowestIdx = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowestIdx]) {
        lowestIdx = j;
      }
    }

    if (i !== lowestIdx) {
      let lowestVal = arr[lowestIdx];
      arr[lowestIdx] = arr[i];
      arr[i] = lowestVal;
    }
  }
  return arr;
}

module.exports = selectionSort;
