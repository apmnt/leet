// Input: s = "bcabc"
// Output: "abc"

// Input: s = "cbacdcbc"
// Output: "acdb"

function smallestSubsequence(s: string): string {
  const lastPositions = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    lastPositions.set(s[i]!, i);
  }

  const stack: string[] = [];
  const inStack = new Set<string>();

  for (let i = 0; i < s.length; i++) {
    const c = s[i]!;
    if (inStack.has(c)) continue;
    while (
      stack.length > 0 &&
      stack[stack.length - 1]! > c &&
      i < lastPositions.get(stack[stack.length - 1]!)!
    ) {
      inStack.delete(stack.pop()!);
    }

    stack.push(c);
    inStack.add(c);
  }
  return stack.join("");
}

// console.log("Example 1");
// console.log("Input:", { s: "bcabc" });
// console.log("Output:", smallestSubsequence("bcabc"));
// console.log("Correct:", "abc");

// console.log("Example 2");
// console.log("Input:", { s: "cbacdcbc" });
// console.log("Output:", smallestSubsequence("cbacdcbc"));
// console.log("Correct:", "acdb");

console.log("Example 2");
console.log("Input:", { s: "cbaacabcaaccaacababa" });
console.log("Output:", smallestSubsequence("cbaacabcaaccaacababa"));
console.log("Correct:", "abc");
