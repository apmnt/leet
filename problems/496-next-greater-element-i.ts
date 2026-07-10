// Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
// Output: [-1,3,-1]
// Explanation: The next greater element for each value of nums1 is as follows:
// - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
// - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
// - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.

// Input: nums1 = [2,4], nums2 = [1,2,3,4]
// Output: [3,-1]
// Explanation: The next greater element for each value of nums1 is as follows:
// - 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
// - 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  // lookup table for the next greater element, key=value, value=index
  let map = new Map<number, number>();
  // stack to keep track of the next greater element (if it even exists)
  let stack: number[] = [];
  // loop through in reverse
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1]! <= nums2[i]!) {
      stack.pop();
    }
    map.set(nums2[i]!, stack[stack.length - 1] ?? -1);
    stack.push(nums2[i]!);
  }
  return nums1.map((value) => map.get(value)!);
}

function nextGreaterElement2(nums1: number[], nums2: number[]): number[] {
  let ans: number[] = new Array(nums1.length).fill(-1);
  // save the indices of the array for O(n) lookup
  let table = new Map<number, number>();

  // populate the table
  nums2.map((value, index) => table.set(value, index));

  for (let nums1index = 0; nums1index < nums1.length; nums1index++) {
    const startingIndex = table.get(nums1[nums1index]!)!;
    console.log(
      "checking for index",
      startingIndex,
      "and value",
      nums1[nums1index]!,
    );
    for (let i = startingIndex; i < nums2.length; i++) {
      console.log("at index", i, "and value", nums2[i]!);
      if (nums2[i]! > nums1[nums1index]!) {
        console.log(
          "found greater at ",
          i,
          "because",
          nums2[i],
          ">",
          nums1[nums1index],
        );
        ans[nums1index] = nums2[i]!;
        break;
      }
    }
  }

  return ans;
}

console.log("Example 1");
console.log("Input:", { nums1: [4, 1, 2], nums2: [1, 3, 4, 2] });
console.log("Output:", nextGreaterElement([4, 1, 2], [1, 3, 4, 2]));
console.log("Correct:", [-1, 3, -1]);

// console.log("Example 2");
// console.log("Input:", { nums1: [2, 4], nums2: [1, 2, 3, 4] });
// console.log("Output:", nextGreaterElement([2, 4], [1, 2, 3, 4]));
// console.log("Correct:", [3, -1]);
