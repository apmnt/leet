// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

// Input: nums = [1], k = 1
// Output: [1]

// Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
// Output: [1,2]

function topKFrequent(nums: number[], k: number): number[] {
  let map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i]!;
    const currValue = map.get(curr);
    map.set(curr, (map.get(curr) ?? 0) + 1);
  }

  const topKeys = [...map.entries()]
    .sort((a, b) => b[1] - a[1]) // Sort by value descending
    .slice(0, k) // Take first k entries
    .map(([key]) => key); // Extract keys}

  return topKeys;
}

console.log("Example 1");
console.log("Input:", { nums: [1, 1, 1, 2, 2, 3], k: 2 });
console.log("Output:", topKFrequent([1, 1, 1, 2, 2, 3], 2));

console.log("Example 2");
console.log("Input:", { nums: [1], k: 1 });
console.log("Output:", topKFrequent([1], 1));

console.log("Example 3");
console.log("Input:", { nums: [1, 2, 1, 2, 1, 2, 3, 1, 3, 2], k: 2 });
console.log("Output:", topKFrequent([1, 2, 1, 2, 1, 2, 3, 1, 3, 2], 2));
