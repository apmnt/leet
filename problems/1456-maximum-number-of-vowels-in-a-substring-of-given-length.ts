// Input: s = "abciiidef", k = 3
// Output: 3
// Explanation: The substring "iii" contains 3 vowel letters.

// Input: s = "aeiou", k = 2
// Output: 2
// Explanation: Any substring of length 2 contains 2 vowels.

// Input: s = "leetcode", k = 3
// Output: 2
// Explanation: "lee", "eet" and "ode" contain 2 vowels.

function maxVowels(s: string, k: number): number {
  const vowels = new Set<string>(["a", "e", "i", "o", "u"]);
  let vowelsInSubstring = 0;
  let max = 0;

  if (s.length < 1) {
    return 0;
  }
  if (s.length === 1) {
    return vowels.has(s[0]!) ? 1 : 0;
  }

  for (let i = 0; i < s.length; i++) {
    if (vowels.has(s[i]!)) {
      vowelsInSubstring++;
    }
    if (i === k - 1) {
      max = vowelsInSubstring;
      continue;
    }
    if (i < k) {
      continue;
    }
    if (vowels.has(s[i - k]!)) {
      vowelsInSubstring--;
    }
    if (vowelsInSubstring > max) {
      max = vowelsInSubstring;
    }
    // console.log("substring", s.slice(i - k, i), vowelsInSubstring);
  }

  return max;
}
console.log("res", maxVowels("ibpbhixfiouhdljnjfflpapptrxgcomvnb", 33));
