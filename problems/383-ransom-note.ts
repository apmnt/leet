// Input: ransomNote = "a", magazine = "b"
// Output: false

// Input: ransomNote = "aa", magazine = "ab"
// Output: false

// Input: ransomNote = "aa", magazine = "aab"
// Output: true

function canConstruct(ransomNote: string, magazine: string): boolean {
  let ransomMap = new Map<string, number>();
  let magazineMap = new Map<string, number>();

  for (const s of magazine) {
    magazineMap.set(s, (magazineMap.get(s) ?? 0) + 1);
  }
  for (const s of ransomNote) {
    ransomMap.set(s, (ransomMap.get(s) ?? 0) + 1);
  }

  for (const [key, value] of ransomMap) {
    if (!magazineMap.has(key) || value > magazineMap.get(key)!) {
      return false;
    }
  }

  return true;
}

console.log("Example 1");
console.log("Input:", { ransomNote: "a", magazine: "b" });
console.log("Output:", canConstruct("a", "b"));
console.log("Correct:", false);

console.log("Example 2");
console.log("Input:", { ransomNote: "aa", magazine: "ab" });
console.log("Output:", canConstruct("aa", "ab"));
console.log("Correct:", false);

console.log("Example 3");
console.log("Input:", { ransomNote: "aa", magazine: "aab" });
console.log("Output:", canConstruct("aa", "aab"));
console.log("Correct:", true);
