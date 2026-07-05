// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]

// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

function productExceptSelf(nums: number[]): number[] {
  let prefix: number[] = [nums[0]!];
  let suffix: number[] = new Array(nums.length).fill(0);
  suffix[nums.length - 1] = nums[nums.length - 1]!;

  let ans: number[] = [];
  let prefixProduct = nums[0]!; // first element
  let suffixProduct = nums[nums.length - 1]!; // last element

  for (let i = 1; i < nums.length; i++) {
    const j = nums.length - i - 1;

    prefixProduct *= nums[i]!;
    prefix[i] = prefixProduct;

    suffixProduct *= nums[j]!;
    suffix[j] = suffixProduct;

    // after halfway of the array start filling the answer
    if (i > j) {
      ans[i] = prefix[i - 1]! * (suffix[i + 1] ?? 1);
      ans[j] = (prefix[j - 1]! ?? 1) * suffix[j + 1]!;

      // 1, 2, 3, 4, 5, 6, 7, 8
      // for [0] calculate 1         * suffix[1]
      // for [1] calculate prefix[0] * suffix[2]
      // for [2] calculate prefix[1] * suffix[3]
      // for [3] calculate prefix[2] * suffix[4]
      // ...
      // for [-3] calculate prefix[-4] * suffix[-2]
      // for [-2] calculate prefix[-3] * suffix[-1]
      // for [-1] calculate prefix[-2] * 1
    } else if (i == j) {
      ans[i] = suffix[i + 1]! * prefix[i - 1]!;
    }
  }
  return ans;
}

console.log("Example 1");
console.log("Input:", { nums: [1, 2, 3, 4, 5, 6, 7, 8] });
console.log("Output:", productExceptSelf([1, 2, 3, 4, 5, 6, 7, 8]));

// console.log("Example 2");
// console.log("Input:", { nums: [-1, 1, 0, -3, 3] });
// console.log("Output:", productExceptSelf([-1, 1, 0, -3, 3]));
