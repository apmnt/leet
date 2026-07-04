// Input: s = "anagram", t = "nagaram"
// Output: true

// Input: s = "rat", t = "car"
// Output: false

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }

  let sSort = s.split("").sort().join();
  let tSort = t.split("").sort().join();
  return sSort == tSort;
}

console.log("Example 1");
console.log("Input:", { s: "anagram", t: "nagaram" });
console.log("Output:", isAnagram("anagram", "nagaram"));

console.log("Example 2");
console.log("Input:", { s: "rat", t: "car" });
console.log("Output:", isAnagram("rat", "car"));
