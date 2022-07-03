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
    let mid = (low + high) / 2;

    //"num > arr[mid-1]" determines if mid is pointing at firstIdx of num
    if (arr[mid] === num && (mid === 0 || num > arr[mid - 1])) {
      return mid;
      // if num greater than pointer value, move low up to one spot above current mid
    } else if (num > arr[mid]) {
      low = mid + 1;
    } else if (num < arr[mid] || num === arr[mid]) {
      high = mid - 1;
    }
  }

  return -1;
}

function findLastIdx(arr, num) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = (low + high) / 2;

    //determines if mid is pointing at lastIdx of num by looking at the number after and the last number in the array
    if (arr[mid] === num && (mid === arr.length - 1 || num < arr[mid + 1])) {
      return mid;
      // if num less than pointer value
    } else if (num < arr[mid]) {
      high = mid - 1;
    } else if (num === arr[mid] || num > arr[mid]) {
      low = mid + 1;
    }
  }
}

// [1,1,2,2,2,2,3]

module.exports = sortedFrequency;
