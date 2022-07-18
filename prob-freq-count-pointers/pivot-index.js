//input: array of integers

//output: pivot index where (sum of items to left) === (sum of items to the right)

//sum of items to left is inclusive so [10,5,5] should return pivotIdx = 0

function pivotIndex(nums) {
  //sum the whole array
  let rightSum = nums.reduce((acc, curr) => acc + curr, 0);
  let leftSum = 0;
  let pivotIdx = -1;

  for (let i = 0; i < nums.length; i++) {
    leftSum += nums[i];
    rightSum -= nums[i];
    if (leftSum === rightSum) {
      pivotIdx = i;
      break;
    }
  }

  return pivotIdx;
}

module.exports = pivotIndex;
