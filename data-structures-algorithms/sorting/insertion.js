function insertionSort(arr) {
  //loop over arr setting a pointer at arr[i]
  for (let i = 0; i < arr.length; i++) {
    let currVal = arr[i];

    //loop with pointer at arr[i - 1] that only runs when j > -1 AND arr[j] > currVal
    for (let j = i - 1; j > -1 && arr[j] > currVal; j--) {
      arr[j + 1] = arr[j];
      arr[j] = currVal;
    }
  }

  return arr;
}

module.exports = insertionSort;
