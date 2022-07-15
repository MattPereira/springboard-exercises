function merge(arr1, arr2) {
  let output = [];

  let i = 0;
  let j = 0;

  //i = 1

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      output.push(arr1[i]);
      i++;
    } else {
      output.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    output.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    output.push(arr2[j]);
    j++;
  }

  return output;
}

function mergeSort(arr) {
  //base case
  if (arr.length <= 1) return arr;

  //normal case
  const midIdx = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, midIdx));
  const right = mergeSort(arr.slice(midIdx));
  return merge(left, right);
}

module.exports = { merge, mergeSort };
