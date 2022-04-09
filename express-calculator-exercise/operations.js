//find the average of an array of numbers
function mean(arr) {
  if (arr.length === 0) return 0;
  let sum = arr.reduce((acc, cur) => acc + cur);
  return sum / arr.length;
}

//find the middle value of an array of sorted numbers
function median(arr) {
  if (arr.length === 0) return 0;

  //sort array ascending
  arr.sort((a, b) => a - b);

  //get middle element if odd length array
  let midIdx = Math.floor(arr.length / 2);

  let median;

  if (arr.length % 2 !== 0) {
    median = arr[midIdx];
  } else {
    median = (arr[midIdx - 1] + arr[midIdx]) / 2;
  }

  return median;
}

// find the most common number in array
function mode(arr) {
  //create object to count how many times a number occurs within array
  let freqCounter = {};
  for (let num of arr) {
    freqCounter[num] ? freqCounter[num]++ : (freqCounter[num] = 1);
  }

  let count = 0;
  let mostFreq;

  //only returns a single mode value even if multiple numbers have max frequency
  // for (let key in freqCounter) {
  //   if (freqCounter[key] > count) {
  //     mostFreq = key;
  //     count = freqCounter[key];
  //   }
  // }

  // returns array of all max value keys
  mostFreq = Object.keys(freqCounter).filter((x) => {
    return freqCounter[x] === Math.max.apply(null, Object.values(freqCounter));
  });

  return convertNumsArray(mostFreq);
}

console.log(mode([1, 2, 3, 4, 4]));

//attempt conversion of array of strings into an array of numbers, return an Error if any item of array is not convertible
function convertNumsArray(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let num = +arr[i];

    if (Number.isNaN(num)) {
      return new Error(
        `The value '${arr[i]}' at index ${i} is not a valid number.`
      );
    }

    result.push(num);
  }

  return result;
}

module.exports = {
  mean,
  median,
  mode,
  convertNumsArray,
};
