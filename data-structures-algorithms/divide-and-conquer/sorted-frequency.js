/** Given a sorted array and a number, write a function
 * that counts the occurrences of the number in the array
 *
 * sortedFrequency([1,1,2,2,2,2,3],2) // 4
 * sortedFrequency([1,1,2,2,2,2,3],3) // 1
 * sortedFrequency([1,1,2,2,2,2,3],1) // 2
 * sortedFrequency([1,1,2,2,2,2,3],4) // -1
 *
 * Constraints: Time Complexity: O(log N)
 */

function sortedFrequency(arr, num) {
  //find the lowest index
  let firstIdx = findFirstIdx(arr, num);
  //if no first index, then num does not exist within arr
  if (firstIdx === -1) return firstIdx;

  //find the highest index
  let lastIdx = findLastIdx(arr, num);
  return lastIdx - firstIdx + 1;
}

function findFirstIdx(arr, num) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let midIdx = (low + high) / 2;

    //if arr[midIdx] is num and its at index 0 or the number before it is a 1
    if (arr[midIdx] === num && (midIdx === 0 || num > arr[midIdx - 1])) {
      return midIdx;
    } else if (num > arr[midIdx]) {
      low = midIdx + 1;
      //if arr[midIdx] is num but the num before it is not less than arr[midIdx]
    } else if (num < arr[midIdx] || num === arr[midIdx]) {
      high = midIdx - 1;
    }
  }

  return -1;
}

function findLastIdx(arr, num) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let midIdx = (low + high) / 2;

    //looking at the number after and the last number in the array
    if (
      arr[midIdx] === num &&
      (midIdx === arr.length - 1 || num < arr[midIdx + 1])
    ) {
      return midIdx;
    } else if (num < arr[midIdx]) {
      high = midIdx - 1;
    } else if (num === arr[midIdx] || num > arr[midIdx]) {
      low = midIdx + 1;
    }
  }
}

// [1,1,2,2,2,2,3]

module.exports = sortedFrequency;
