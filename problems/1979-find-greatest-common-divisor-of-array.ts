// Input: nums = [2,5,6,9,10]
// Output: 2
// Explanation:
// The smallest number in nums is 2.
// The largest number in nums is 10.
// The greatest common divisor of 2 and 10 is 2.

// Input: nums = [7,5,6,8,3]
// Output: 1
// Explanation:
// The smallest number in nums is 3.
// The largest number in nums is 8.
// The greatest common divisor of 3 and 8 is 1.

// Input: nums = [3,3]
// Output: 3
// Explanation:
// The smallest number in nums is 3.
// The largest number in nums is 3.
// The greatest common divisor of 3 and 3 is 3.

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function findGCD(nums: number[]): number {
  let largest = -Infinity;
  let smallest = Infinity;

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i]!;
    largest = Math.max(largest, curr);
    smallest = Math.min(smallest, curr);
  }
  return gcd(smallest, largest);
}

console.log("Example 1");
console.log("Input:", { nums: [2, 5, 6, 9, 10] });
console.log("Output:", findGCD([2, 5, 6, 9, 10]));
console.log("Correct:", 2);

console.log("Example 2");
console.log("Input:", { nums: [7, 5, 6, 8, 3] });
console.log("Output:", findGCD([7, 5, 6, 8, 3]));
console.log("Correct:", 1);

console.log("Example 3");
console.log("Input:", { nums: [3, 3] });
console.log("Output:", findGCD([3, 3]));
console.log("Correct:", 3);
