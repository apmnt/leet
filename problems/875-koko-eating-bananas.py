# Input: piles = [3,6,7,11], h = 8
# Output: 4

# Input: piles = [30,11,23,4,20], h = 5
# Output: 30

# Input: piles = [30,11,23,4,20], h = 6
# Output: 23

from __future__ import annotations
from typing import List


class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:

        piles.sort()

        left = 0
        right = sum(piles)

        best_time = -1

        def haveEnoughTimeToEat(speed):
            if speed < 1:
                return False
            required_time = 0
            for pile in piles:
                required_time += -(pile // -speed)
            return required_time <= h

        while left <= right:
            middle = left + (right - left) // 2
            if haveEnoughTimeToEat(middle):
                best_time = middle
                right = middle - 1

            else:
                left = middle + 1

        return best_time


solution = Solution()

input_1 = {"piles": [3, 6, 7, 11], "h": 8}
print("Example 1")
print("Input:", input_1)
print("Output:", solution.minEatingSpeed(**input_1))
print("Correct:", 4)

input_2 = {"piles": [30, 11, 23, 4, 20], "h": 5}
print("Example 2")
print("Input:", input_2)
print("Output:", solution.minEatingSpeed(**input_2))
print("Correct:", 30)

input_3 = {"piles": [30, 11, 23, 4, 20], "h": 6}
print("Example 3")
print("Input:", input_3)
print("Output:", solution.minEatingSpeed(**input_3))
print("Correct:", 23)
