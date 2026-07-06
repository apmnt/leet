// Input: intervals = [[1,4],[3,6],[2,8]]
// Output: 2
// Explanation: Interval [3,6] is covered by [2,8], therefore it is removed.

// Input: intervals = [[1,4],[2,3]]
// Output: 1

function removeCoveredIntervals(intervals: number[][]): number {
  let sorted = intervals.toSorted((a, b) => {
    if (a[0] !== b[0]) {
      return a[0]! - b[0]!;
    }

    return b[1]! - a[1]!;
  });
  // keep track of useless intervals in a set
  let set = new Set<number[]>();

  let startingLength = -1;
  let setLength = 0;

  while (setLength > startingLength) {
    startingLength = setLength;
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i]![1]! > sorted[i + 1]![1]!) {
        set.add(sorted[i + 1]!);
      } else if (
        sorted[i]![1]! === sorted[i + 1]![1]! &&
        sorted[i]![0]! < sorted[i + 1]![0]!
      ) {
        set.add(sorted[i]!);
      }
    }
    setLength = set.size;
    sorted = sorted.filter((value) => !set.has(value));
  }

  const count = sorted.reduce(
    (acc, value) => acc + (set.has(value) ? 0 : 1),
    0,
  );

  return count;
}

console.log("Example 1");
console.log("Input:", {
  intervals: [
    [1, 4],
    [3, 6],
    [2, 8],
  ],
});
console.log(
  "Output:",
  removeCoveredIntervals([
    [1, 4],
    [3, 6],
    [2, 8],
  ]),
);
console.log("Correct:", 2);

console.log("Example 2");
console.log("Input:", {
  intervals: [
    [1, 4],
    [2, 3],
  ],
});
console.log(
  "Output:",
  removeCoveredIntervals([
    [1, 4],
    [2, 3],
  ]),
);
console.log("Correct:", 1);

console.log("Example 3");
console.log("Input:", {
  intervals: [
    [1, 2],
    [1, 4],
    [3, 4],
  ],
});
console.log(
  "Output:",
  removeCoveredIntervals([
    [1, 2],
    [1, 4],
    [3, 4],
  ]),
);
console.log("Correct:", 1);

console.log("Example 3");
console.log("Input:", {
  intervals: [
    [66672, 75156],
    [59890, 65654],
    [92950, 95965],
    [9103, 31953],
    [54869, 69855],
    [33272, 92693],
    [52631, 65356],
    [43332, 89722],
    [4218, 57729],
    [20993, 92876],
  ],
});
console.log(
  "Output:",
  removeCoveredIntervals([
    [66672, 75156],
    [59890, 65654],
    [92950, 95965],
    [9103, 31953],
    [54869, 69855],
    [33272, 92693],
    [52631, 65356],
    [43332, 89722],
    [4218, 57729],
    [20993, 92876],
  ]),
);
console.log("Correct:", 3);
console.log("Example 4");
console.log("Input:", {
  intervals: [
    [3, 10],
    [4, 10],
    [5, 11],
  ],
});
console.log(
  "Output:",
  removeCoveredIntervals([
    [3, 10],
    [4, 10],
    [5, 11],
  ]),
);
console.log("Correct:", 2);
