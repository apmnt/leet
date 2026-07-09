// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9

// Input: tokens = ["4","13","5","/","+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6

// Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// Output: 22
// Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22

function evalRPN(tokens: string[]): number {
  if (tokens.length === 1) {
    return Number(tokens[0]!);
  }

  const operations = new Map<string, (a: number, b: number) => number>([
    ["+", (a, b) => a + b],
    ["-", (a, b) => a - b],
    ["*", (a, b) => a * b],
    ["/", (a, b) => Math.trunc(a / b)],
  ]);
  const operationsSet = new Set<string>([...operations.keys()]);

  let stack: number[] = [];

  for (const token of tokens) {
    if (operationsSet.has(token)) {
      const op = operations.get(token)!;
      //   console.log(stack, token);
      const right = stack.pop()!;
      const left = stack.pop()!;
      stack.push(op(left, right));
      //   console.log("=", stack[stack.length - 1]!);
    } else {
      stack.push(Number(token));
    }
  }
  return stack[0]!;
}

console.log("Example 1");
console.log("Input:", { tokens: ["2", "1", "+", "3", "*"] });
console.log("Output:", evalRPN(["2", "1", "+", "3", "*"]));
console.log("Correct:", 9);

console.log("Example 2");
console.log("Input:", { tokens: ["4", "13", "5", "/", "+"] });
console.log("Output:", evalRPN(["4", "13", "5", "/", "+"]));
console.log("Correct:", 6);

console.log("Example 3");
console.log("Input:", {
  tokens: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"],
});
console.log(
  "Output:",
  evalRPN([
    "10",
    "6",
    "9",
    "3",
    "+",
    "-11",
    "*",
    "/",
    "*",
    "17",
    "+",
    "5",
    "+",
  ]),
);
console.log("Correct:", 22);

console.log();
console.log();
console.log();
evalRPN(["1", "2", "+", "3", "*", "4", "-"]);
