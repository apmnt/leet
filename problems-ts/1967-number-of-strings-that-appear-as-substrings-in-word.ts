// Example 1:

// Input: patterns = ["a","abc","bc","d"], word = "abc"
// Output: 3
// Explanation:
// - "a" appears as a substring in "abc".
// - "abc" appears as a substring in "abc".
// - "bc" appears as a substring in "abc".
// - "d" does not appear as a substring in "abc".
// 3 of the strings in patterns appear as a substring in word.
// Example 2:

// Input: patterns = ["a","b","c"], word = "aaaaabbbbb"
// Output: 2
// Explanation:
// - "a" appears as a substring in "aaaaabbbbb".
// - "b" appears as a substring in "aaaaabbbbb".
// - "c" does not appear as a substring in "aaaaabbbbb".
// 2 of the strings in patterns appear as a substring in word.
// Example 3:

// Input: patterns = ["a","a","a"], word = "ab"
// Output: 3
// Explanation: Each of the patterns appears as a substring in word "ab".

function numOfStrings(patterns: string[], word: string): number {
  return patterns.reduce(
    (count: number, str: string) => count + (word.includes(str) ? 1 : 0),
    0,
  );
}

function numOfStrings2(patterns: string[], word: string): number {
  return patterns.filter((str) => word.includes(str)).length;
}

const solution = numOfStrings;
console.log("should be 3", solution(["a", "abc", "bc", "d"], "abc"));
console.log("should be 2", solution(["a", "b", "c"], "aaaaabbbbb"));
