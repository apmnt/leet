// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Explanation:
// There is no string in strs that can be rearranged to form "bat". The strings "nat" and "tan" are anagrams as they can be rearranged to form each other. The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

// Input: strs = [""]
// Output: [[""]]

// Input: strs = ["a"]
// Output: [["a"]]

function groupAnagrams(strs: string[]): string[][] {
  let map = new Map<string, number>();
  let ans: string[][] = [];
  let indexer = 0;

  for (let i = 0; i < strs.length; i++) {
    const word = strs[i]!;
    const sortedWord = word.split("").sort().join("");
    if (!map.has(sortedWord)) {
      map.set(sortedWord, indexer);
      ans.push([]);
      indexer++;
    }
    ans[map.get(sortedWord)!]?.push(word);
  }
  return ans;
}

console.log("Example 1");
console.log("Input:", { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] });
console.log(
  "Output:",
  groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]),
);

console.log("Example 2");
console.log("Input:", { strs: [""] });
console.log("Output:", groupAnagrams([""]));

console.log("Example 3");
console.log("Input:", { strs: ["a"] });
console.log("Output:", groupAnagrams(["a"]));
