// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

function threeSum(nums: number[]): number[][] {
  if (nums.length < 3) {
    return [];
  }
  if (nums.length === 3) {
    return nums.reduce((acc, value) => acc + value, 0) === 0 ? [nums] : [];
  }

  nums.sort((a, b) => a - b);
  const n = nums.length;
  if (nums[0] === nums[n - 1]) {
    return [nums.slice(0, 3)];
  }
  const ans: number[][] = [];
  const set = new Set<string>();

  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    const fixed = nums[i]!;
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const total = nums[left]! + nums[right]! + fixed;
      if (total > 0) {
        right--;
      } else if (total < 0) {
        left++;
      } else {
        // working triplet
        const triplet = [nums[left]!, nums[right]!, fixed].sort();
        const tripletStr = triplet.join(",");
        if (!set.has(tripletStr)) {
          ans.push(triplet);
          set.add(tripletStr);
        }
        left++;
        right--;

        // skip duplicate left
        while (left < right && nums[left] === nums[left - 1]) {
          left++;
        }

        // skip duplicate right
        while (left < right && nums[right] === nums[right + 1]) {
          right--;
        }
      }
    }
  }
  return [...ans];
}

console.log("Example 1");
console.log("Input:", { nums: [-1, 0, 1, 2, -1, -4] });
console.log("Output:", threeSum([-1, 0, 1, 2, -1, -4]));
console.log("Correct:", [
  [-1, -1, 2],
  [-1, 0, 1],
]);

console.log("Example 2");
console.log("Input:", { nums: [0, 1, 1] });
console.log("Output:", threeSum([0, 1, 1]));
console.log("Correct:", []);

console.log("Example 3");
console.log("Input:", { nums: [0, 0, 0] });
console.log("Output:", threeSum([0, 0, 0]));
console.log("Correct:", [[0, 0, 0]]);
