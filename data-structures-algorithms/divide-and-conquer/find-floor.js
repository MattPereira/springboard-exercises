/** Write a function called findFloor which accepts a sorted array
 * and a value x, and returns the floor of x in the array.
 * The floor of x in an array is the largest element in the array
 * which is smaller than or equal to x. If the floor does not exist,
 * return -1.
 *
 * Constraints: Time Complexity: O(log N)
 *
 * findFloor([1,2,8,10,10,12,19], 5) // 2
 * findFloor([1,2,8,10,10,12,19], 20) // 19
 * findFloor([1,2,8,10,10,12,19], 0) // -1
 */

//handle if x is >

function findFloor(arr, x) {
  //edge case where x > all values in the array
  if (x > arr[arr.length - 1]) return arr[arr.length - 1];

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (x === arr[mid]) {
      return arr[mid];
    } else if (x < arr[mid] && x > arr[mid - 1]) {
      return arr[mid - 1];
    } else if (x < arr[mid]) {
      high = mid - 1;
    } else if (x > arr[mid]) {
      low = mid + 1;
    }
  }

  //edge case where x < arr[0]
  return -1;
}

module.exports = findFloor;
