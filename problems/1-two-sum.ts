// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Input: nums = [3,3], target = 6
// Output: [0,1]

function twoSum(nums: number[], target: number): number[] {
  let map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i]!;
    const need = target - curr;
    if (map.has(need)) {
      return [i, map.get(need)!];
    }
    map.set(curr, i);
  }
  return [];
}

console.log("Example 1");
console.log("Input:", { nums: [2, 7, 11, 15], target: 9 });
console.log("Output:", twoSum([2, 7, 11, 15], 9));

console.log("Example 2");
console.log("Input:", { nums: [3, 2, 4], target: 6 });
console.log("Output:", twoSum([3, 2, 4], 6));

console.log("Example 3");
console.log("Input:", { nums: [3, 3], target: 6 });
console.log("Output:", twoSum([3, 3], 6));
