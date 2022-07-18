//input: array

//output: length of longest consecutive decrease of integers

//NAIVE LOOP
function longestFall(nums) {
  //max fall count
  let maxFall = 0;
  //temp fall count
  let currFall = 1;

  //edge case of empty array
  if (nums.length === 0) return 0;

  //start loop at 2nd element in array
  for (let i = 1; i < nums.length; i++) {
    // if current number is smaller than previous number
    if (nums[i] < nums[i - 1]) {
      currFall++;
      maxFall = Math.max(currFall, maxFall);
    } else if (nums[i] >= nums[i - 1]) {
      currFall = 1;
    }
  }

  //default value for non empty array is 1
  return maxFall || 1;
}

module.exports = longestFall;
