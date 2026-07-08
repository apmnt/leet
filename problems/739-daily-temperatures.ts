// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]

// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]

// Input: temperatures = [30,60,90]
// Output: [1,1,0]

// [73,74,75,71,69,72,76,73]
//                    ^^
//                    if 73 < 76

function dailyTemperatures(temperatures: number[]): number[] {
  let stack: number[][] = [];
  let ans = new Array<number>(temperatures.length).fill(0);
  for (let i = temperatures.length - 1; i >= 0; i--) {
    while (
      stack.length > 0 &&
      stack[stack.length - 1]![0]! <= temperatures[i]!
    ) {
      stack.pop()!;
    }
    if (stack.length > 0) {
      ans[i] = stack[stack.length - 1]![1]! - i;
    }
    stack.push([temperatures[i]!, i]);
  }
  return ans;
}

console.log("Example 1");
console.log("Input:", { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] });
console.log("Output:", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
console.log("Correct:", [1, 1, 4, 2, 1, 1, 0, 0]);

// console.log("Example 2");
// console.log("Input:", { temperatures: [30, 40, 50, 60, 70] });
// console.log("Output:", dailyTemperatures([30, 40, 50, 60, 70]));
// console.log("Correct:", [1, 1, 1, 0]);

// // console.log("Example 3");
// // console.log("Input:", { temperatures: [30, 60, 90] });
// // console.log("Output:", dailyTemperatures([30, 60, 90]));
// // console.log("Correct:", [1, 1, 0]);
