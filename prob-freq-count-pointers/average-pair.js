//inputs: 1. sorted array of integers 2. target average

//output: boolean, return true if two nums from array have an average that matches the targetAvg

//constraint: O(N) which means two pointers, no brute forcing with a nested loop

function averagePair(nums, targetAvg) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let avg = (nums[left] + nums[right]) / 2;

    if (avg === targetAvg) {
      return true;
    } else if (avg > targetAvg) {
      right -= 1;
    } else if (avg < targetAvg) {
      left += 1;
    }
  }

  //no pair of nums' avg matches the targetAvg
  return false;
}

module.exports = averagePair;
