// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

// Input: height = [1,1]
// Output: 1

function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;

  let best = 0;

  while (left < right) {
    const leftValue = height[left]!;
    const rightValue = height[right]!;
    const area = Math.min(leftValue, rightValue) * (right - left);
    best = Math.max(best, area);
    if (leftValue > rightValue) {
      right--;
    } else if (leftValue < rightValue) {
      left++;
    } else {
      right--;
      left++;
    }
  }
  return best;
}

console.log("Example 1");
console.log("Input:", { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] });
console.log("Output:", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log("Correct:", 49);

console.log("Example 2");
console.log("Input:", { height: [1, 1] });
console.log("Output:", maxArea([1, 1]));
console.log("Correct:", 1);
