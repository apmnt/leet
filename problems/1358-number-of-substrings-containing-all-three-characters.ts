// Input: s = "abcabc"
// Output: 10
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).

// Input: s = "aaacb"
// Output: 3
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".

// Input: s = "abc"
// Output: 1

function numberOfSubstrings(s: string): number {
  let charMap = new Map<string, number>();
  charMap.set("a", 0);
  charMap.set("b", 0);
  charMap.set("c", 0);

  let leftIndex = 0;
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    const currentChar = s[i] ?? "";
    charMap.set(currentChar, charMap.get(currentChar)! + 1);
    while (
      (charMap.get("a") ?? 0) > 0 &&
      (charMap.get("b") ?? 0) > 0 &&
      (charMap.get("c") ?? 0) > 0
    ) {
      // debug print
      // for (let end = i; end < s.length; end++) {
      //   console.log(s.slice(leftIndex, end + 1));
      // }
      count += s.length - i;
      const leftChar = s[leftIndex] ?? "";
      charMap.set(leftChar, charMap.get(leftChar)! - 1);
      leftIndex++;
    }
  }
  return count;
}

console.log(numberOfSubstrings("abcabc"));
