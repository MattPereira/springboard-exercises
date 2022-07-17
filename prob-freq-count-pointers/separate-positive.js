//input: array of non-zero integers

//output: positive integers on the left, negative integers to the right

//done in place, dont use extra memory with a copy of array

//constraint: O(n)

function separatePositive(nums) {
  let start = 0;
  let end = nums.length - 1;

  while (start < end) {
    if (nums[start] < 0 && nums[end] > 0) {
      let temp = nums[end];
      nums[end] = nums[start];
      nums[start] = temp;

      start += 1;
      end -= 1;
    } else {
      if (nums[start] > 0) start += 1;
      else if (nums[end] < 0) end -= 1;
    }
  }

  return nums;
}

module.exports = separatePositive;
