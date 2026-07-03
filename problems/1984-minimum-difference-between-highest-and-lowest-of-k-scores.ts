// Input: nums = [90], k = 1
// Output: 0
// Explanation: There is one way to pick score(s) of one student:
// - [90]. The difference between the highest and lowest score is 90 - 90 = 0.
// The minimum possible difference is 0.

// Input: nums = [9,4,1,7], k = 2
// Output: 2
// Explanation: There are six ways to pick score(s) of two students:
// - [9,4,1,7]. The difference between the highest and lowest score is 9 - 4 = 5.
// - [9,4,1,7]. The difference between the highest and lowest score is 9 - 1 = 8.
// - [9,4,1,7]. The difference between the highest and lowest score is 9 - 7 = 2.
// - [9,4,1,7]. The difference between the highest and lowest score is 4 - 1 = 3.
// - [9,4,1,7]. The difference between the highest and lowest score is 7 - 4 = 3.
// - [9,4,1,7]. The difference between the highest and lowest score is 7 - 1 = 6.
// The minimum possible difference is 2.

function minimumDifference(nums: number[], k: number): number {
  if (nums.length === 1) {
    return 0;
  }
  if (nums.length === 2) {
    return Math.abs(nums[0]! - nums[1]!);
  }
  nums.sort(function (a, b) {
    return a - b;
  });

  let min = Infinity;
  for (let i = k - 1; i < nums.length; i++) {
    const currDiff = nums[i]! - nums[i - k + 1]!;
    min = Math.min(min, currDiff);
  }
  return min;
}
