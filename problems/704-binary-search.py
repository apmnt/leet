# Input: nums = [-1,0,3,5,9,12], target = 9
# Output: 4
# Explanation: 9 exists in nums and its index is 4

# Input: nums = [-1,0,3,5,9,12], target = 2
# Output: -1
# Explanation: 2 does not exist in nums so return -1

from typing import List


class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums)-1

        while left <= right:
            middle = left + ((right - left) // 2)
            if nums[middle] < target:
                left = middle + 1
            elif nums[middle] > target:
                right = middle - 1
            else:
                return middle
        return -1


solution = Solution()

input_1 = {"nums": [-1, 0, 3, 5, 9, 12], "target": 9}
print("Example 1")
print("Input:", input_1)
print("Output:", solution.search(**input_1))
print("Correct:", 4)

input_2 = {"nums": [-1, 0, 3, 5, 9, 12], "target": 2}
print("Example 2")
print("Input:", input_2)
print("Output:", solution.search(**input_2))
print("Correct:", -1)
