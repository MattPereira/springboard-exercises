/** Write a function called findRotatedIndex which accepts
 * a rotated array of sorted numbers and an integer.
 * The function should return the index of num in the array.
 * If the value is not found, return -1.
 *
 * Constraints: Time Complexity: O(log N)
 *
 * findRotatedIndex([3,4,1,2],4) // 1
 * findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) // 2
 * findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
 * findRotatedIndex([37,44,66,102,10,22],14) // -1
 * findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1
 *
 */

//First step is to find the pivotIdx
//the pivot is the index of the first lower value after a high value
function findPivot(arr) {
  if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;

  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] > arr[mid + 1]) return mid + 1;
    else if (arr[start] <= arr[mid]) {
      start = mid + 1;
    } else if (arr[start] > arr[mid]) {
      end = mid - 1;
    }
  }
}

//Second step is to declare binarySearch function with start and end parameters
function binarySearch(array, num, start, end) {
  if (array.length === 0) return -1;
  if (num < array[start] || num > array[end]) return -1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (array[mid] === num) {
      return mid;
    } else if (num < array[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}

//Final step is to findPivot(array) and set up binarySearch conditional
function findRotatedIndex(array, num) {
  let pivotIdx = findPivot(array);

  if (pivotIdx > 0 && num >= array[0] && num <= array[pivotIdx - 1]) {
    //binary search from start of array to pivotIdx - 1
    return binarySearch(array, num, 0, pivotIdx - 1);
  } else {
    //binary search from pivotIdx to the end of array
    return binarySearch(array, num, pivotIdx, array.length - 1);
  }
}

//[3,4,5,6,7,1,2]

module.exports = { findRotatedIndex, findPivot, binarySearch };
