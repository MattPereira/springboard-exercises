/** Write a function called findRotationCount which accepts an array
 * of distinct numbers sorted in increasing order. The array has been
 * rotated counter-clockwise n number of times. Given such an array,
 * find the value of n
 *
 * Constraints: Time Complexity: O(log N)
 *
 * Examples:
 * findRotationCount([15, 18, 2, 3, 6, 12]) // 2
 * findRotationCount([7, 9, 11, 12, 5]) // 4
 * findRotationCount([7, 9, 11, 12, 15]) // 0
 *
 */

//the value of n is just the pivotIdx?

function findRotationCount(arr) {
  //handle edge cases of 1 item array and array with only ascending values
  if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;

  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    //move midIdx until the value before midIdx is greater than arr[midIdx]
    if (arr[mid - 1] > arr[mid]) return mid;
    else if (arr[start] <= arr[mid]) {
      start = mid + 1;
    } else if (arr[start] > arr[mid]) {
      end = mid - 1;
    }
  }
}

// [4, 10]
// [11, 12, 6, 7, 8, 9, 10]

module.exports = findRotationCount;
