// Input: pattern = "abba", s = "dog cat cat dog"
// Output: true

// Input: pattern = "abba", s = "dog cat cat fish"
// Output: false

// Input: pattern = "aaaa", s = "dog cat cat dog"
// Output: false
function wordPattern(pattern: string, s: string): boolean {
  let wordMap = new Map<string, string>();
  const usedWords = new Set<string>();
  const wordArray = s.split(" ");

  if (pattern.length !== wordArray.length) {
    return false;
  }

  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i];
    const word = wordArray[i];
    if (ch === undefined || word === undefined) {
      return false;
    }
    const mappedWord = wordMap.get(ch);
    if (mappedWord === undefined) {
      if (usedWords.has(word)) {
        return false;
      }
      wordMap.set(ch, word);
      usedWords.add(word);
    } else if (mappedWord !== word) {
      return false;
    }
  }

  return true;
}

console.log("should be false", wordPattern("abba", "dog dog dog dog"));
console.log("should be true", wordPattern("abba", "dog cat cat dog"));
