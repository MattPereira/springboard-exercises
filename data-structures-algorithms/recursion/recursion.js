/** product: calculate the product of an array of numbers. */

function product(nums) {
  //Base Case watching for when array length hits zero
  if (!nums.length) return 1;

  //Normal Case decrements array.length with .pop() method
  return nums.pop() * product(nums);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, idx = 0, longestLength = 0) {
  //Base Case
  if (idx === words.length) return longestLength;

  //Normal Case
  longestLength = Math.max(words[idx].length, longestLength);
  return longest(words, idx + 1, longestLength);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, idx = 0, newStr = "") {
  //Base Case
  if (idx >= str.length) return newStr;

  //Normal Case
  newStr += str[idx];
  return everyOther(str, idx + 2, newStr);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, idx = 0) {
  let leftIdx = idx;
  let rightIdx = str.length - idx - 1;

  //Base Cases
  //if the left idx gets bigger than the right, its a palindrome
  if (leftIdx >= rightIdx) return true;
  //if at any point in the recursing the letter on left and right are not equal, its not a palindrome
  if (str[leftIdx] !== str[rightIdx]) return false;

  //Normal Case: increment the idx by 1 with each recursing
  return isPalindrome(str, idx + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
  //Base Cases
  if (arr[idx] === val) return idx;
  if (idx === arr.length - 1) return -1;

  //Normal Case
  return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, idx = str.length - 1, revStr = "") {
  //Base Case
  revStr += str[idx];
  if (revStr.length === str.length) return revStr;

  //Normal Case
  return revString(str, idx - 1, revStr);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strArr = [];

  for (let key in obj) {
    if (typeof obj[key] === "string") strArr.push(obj[key]);
    //use spread operator to avoid nested arrays
    if (typeof obj[key] === "object") strArr.push(...gatherStrings(obj[key]));
  }

  //Base Case ?
  return strArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, low = 0, high = arr.length - 1) {
  if (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === val) return mid;
    else if (arr[mid] > val) {
      return binarySearch(arr, val, low, mid - 1);
    } else {
      return binarySearch(arr, val, mid + 1, high);
    }
  }

  //if val not in array
  return -1;
}

// [1,2,3,4,5,6,7] // 2

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch,
};
