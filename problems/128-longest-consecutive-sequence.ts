// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9

// Input: nums = [1,0,1,2]
// Output: 3

function longestConsecutive(nums: number[]): number {
  let set = new Set<number>(nums);
  let longest = 0;
  for (let curr of set) {
    if (set.has(curr - 1)) {
      continue;
    }
    let currLongest = 0;
    while (set.has(curr)) {
      curr++;
      currLongest++;
    }
    longest = Math.max(longest, currLongest);
  }
  return longest;
}

console.log("Example 1");
console.log("Input:", { nums: [100, 4, 200, 1, 3, 2] });
console.log("Output:", longestConsecutive([100, 4, 200, 1, 3, 2]));
console.log("Correct:", 4);

console.log("Example 2");
console.log("Input:", { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] });
console.log("Output:", longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
console.log("Correct:", 9);

console.log("Example 3");
console.log("Input:", { nums: [1, 0, 1, 2] });
console.log("Output:", longestConsecutive([1, 0, 1, 2]));
console.log("Correct:", 3);
