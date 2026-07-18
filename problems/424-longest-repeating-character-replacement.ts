// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa.

// Input: s = "AABABBA", k = 1
// Output: 4
// Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
// The substring "BBBB" has the longest repeating letters, which is 4.
// There may exists other ways to achieve this answer too.

// ABABBA
// ^  ^

function characterReplacement(s: string, k: number): number {
  let left = 0;
  let longest = 0;
  let maxFrequency = 0;

  const letterCounts = Array.from({ length: 26 }, (_) => 0);

  for (let right = 0; right < s.length; right++) {
    const rightIndex = s.charCodeAt(right) - 65;
    letterCounts[rightIndex]!++;
    maxFrequency = Math.max(maxFrequency, letterCounts[rightIndex]!);

    while (right - left + 1 - maxFrequency > k) {
      const leftIndex = s.charCodeAt(left) - 65;
      letterCounts[leftIndex]!--;
      left++;
    }

    longest = Math.max(longest, right - left + 1);
  }
  return longest;
}

// console.log("Example 1");
// console.log("Input:", { s: "ABAB", k: 2 });
// console.log("Output:", characterReplacement("ABAB", 2));
// console.log("Correct:", 4);

// console.log("Example 2");
// console.log("Input:", { s: "AABABBA", k: 1 });
// console.log("Output:", characterReplacement("AABABBA", 1));
// console.log("Correct:", 4);

console.log("Example 3");
console.log("Input:", { s: "ABAB", k: 0 });
console.log("Output:", characterReplacement("ABAB", 0));
console.log("Correct:", 1);
