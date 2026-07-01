// Input: nums = [1,12,-5,-6,50,3], k = 4
// Output: 12.75000
// Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

// Input: nums = [5], k = 1
// Output: 5.00000

function findMaxAverage(nums: number[], k: number): number {
  let sum = nums.slice(0, k).reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  let maxSum = sum;

  for (let i = k; i < nums.length; i++) {
    sum -= nums[i - k]!;
    sum += nums[i]!;
    // console.log("curr sub arr", nums.slice(i - k, i), "sum", sum);
    if (sum > maxSum) {
      maxSum = sum;
    }
  }
  return maxSum / k;
}
console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4));
