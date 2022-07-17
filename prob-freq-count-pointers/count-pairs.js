//input: array of integers, a target number

//output: the number of pairs of integers in the array whos sum is equal to target

//NO DUPES IN THE ARRAY

// O(Nlog(N)) solution
// function countPairs(nums, targetNum) {
//   //sort the array so that two pointers works
//   nums = nums.sort((a, b) => a - b);

//   //accumulator for successful pairs
//   let pairsCounter = 0;

//   let left = 0;
//   let right = nums.length - 1;

//   while (left < right) {
//     let sum = nums[left] + nums[right];
//     if (sum === targetNum) {
//       pairsCounter++;
//       left++;
//       right--;
//     } else if (sum > targetNum) {
//       right--;
//     } else if (sum < targetNum) {
//       left++;
//     }
//   }

//   return pairsCounter;
// }

//O(n log n) / O(1) solution!
function countPairs(nums, targetNum) {
  let s = new Set(nums);
  let count = 0;

  for (let val of nums) {
    s.delete(val);
    //if the set contains the difference btwn target and deleted value
    if (s.has(targetNum - val)) {
      count++;
    }
  }
  return count;
}

module.exports = countPairs;
