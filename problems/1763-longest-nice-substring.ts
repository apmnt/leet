// Input: s = "YazaAay"
// Output: "aAa"
// Explanation: "aAa" is a nice string because 'A/a' is the only letter of the alphabet in s, and both 'A' and 'a' appear.
// "aAa" is the longest nice substring.

// Input: s = "Bb"
// Output: "Bb"
// Explanation: "Bb" is a nice string because both 'B' and 'b' appear. The whole string is a substring.

// Input: s = "c"
// Output: ""
// Explanation: There are no nice substrings.

function longestNiceSubstring(s: string): string {
  let set = new Set<string>(s);
  let right;

  for (let i = 0; i < s.length; i++) {
    if (!set.has(s[i]!.toLowerCase()) || !set.has(s[i]!.toUpperCase())) {
      const left = longestNiceSubstring(s.slice(0, i));
      const right = longestNiceSubstring(s.slice(i + 1));
      return left.length >= right.length ? left : right;
    }
  }
  return s;
}
console.log(longestNiceSubstring("YazaAay"));
// console.log(longestNiceSubstring("Bb"));
// console.log(longestNiceSubstring("c"));
