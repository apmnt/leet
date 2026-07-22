# Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
# Output: true

# Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
# Output: false

from __future__ import annotations
from typing import List


def search(self, nums: List[int], target: int) -> int:
    left = 0
    right = len(nums) - 1

    while left <= right:
        middle = left + ((right - left) // 2)
        if nums[middle] < target:
            left = middle + 1
        elif nums[middle] > target:
            right = middle - 1
        else:
            return middle
    return -1


class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        rows = len(matrix)
        cols = len(matrix[0])

        def get_row_and_col(index):
            col = index % cols
            row = index // cols
            return (row, col)

        left = 0
        right = rows * cols - 1

        while left <= right:
            middle = left + ((right - left) // 2)
            row, col = get_row_and_col(middle)
            curr = matrix[row][col]
            if curr < target:
                left = middle + 1
            elif curr > target:
                right = middle - 1
            else:
                return True

        return False


solution = Solution()

input_1 = {"matrix": [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], "target": 3}
print("Example 1")
print("Input:", input_1)
print("Output:", solution.searchMatrix(**input_1))
print("Correct:", True)

input_2 = {"matrix": [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], "target": 13}
print("Example 2")
print("Input:", input_2)
print("Output:", solution.searchMatrix(**input_2))
print("Correct:", False)
