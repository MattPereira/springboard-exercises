// input: two positive integers

//output: boolean => true if both numbers have the same frequency of digits, otherwise false

//constraint: O(n + m) so sorting not allowed

function sameFrequency(num1, num2) {
  let num1Arr = num1.toString().split("");
  let num2Arr = num2.toString().split("");

  //cant have same freq of nums if not same length!
  if (num1Arr.length !== num2Arr.length) return false;

  let num1Freq = {};
  let num2Freq = {};

  for (let num of num1Arr) {
    num1Freq[num] = num1Freq[num] + 1 || 1;
  }
  for (let num of num2Arr) {
    num2Freq[num] = num2Freq[num] + 1 || 1;
  }

  console.log(num1Freq);
  console.log(num2Freq);

  for (let key in num1Freq) {
    if (num1Freq[key] !== num2Freq[key]) return false;
  }

  return true;
}

module.exports = sameFrequency;
