// Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").

// Input: s1 = "ab", s2 = "eidboaoo"
// Output: false

function checkInclusion(s1: string, s2: string): boolean {
  const populateMap = (str: string) => {
    const map = new Map<string, number>();
    for (const s of str) {
      const mapVal = map.get(s);
      map.set(s, mapVal ? mapVal + 1 : 1);
    }
    return map;
  };

  const window = s1.length;
  const map1 = populateMap(s1)!;
  const map1Keys = [...map1.keys()];
  const map2 = populateMap(s2.slice(0, window))!;

  for (let left = 0; left < s2.length - window + 1; left++) {
    const right = left + window;
    const mapValuesMatch = map1Keys.every(
      (key) => map1.get(key) === map2.get(key),
    );
    // console.log(map1, map2);
    if (mapValuesMatch) return true;
    const leftValue = s2[left]!;
    const rightValue = s2[right]!;
    map2.set(leftValue, map2.get(leftValue)! - 1);
    map2.set(rightValue, map2.get(rightValue) ? map2.get(rightValue)! + 1 : 1);
  }

  return false;
}









console.log("Example 1");
console.log("Input:", { s1: "ab", s2: "eidbaooo" });
console.log("Output:", checkInclusion("ab", "eidbaooo"));
console.log("Correct:", true);

console.log("Example 2");
console.log("Input:", { s1: "ab", s2: "eidboaoo" });
console.log("Output:", checkInclusion("ab", "eidboaoo"));
console.log("Correct:", false);

console.log("Example 3");
console.log("Input:", { s1: "adc", s2: "dcda" });
console.log("Output:", checkInclusion("adc", "dcda"));
console.log("Correct:", true);
