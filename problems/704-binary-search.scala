// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in nums and its index is 4

// Input: nums = [-1,0,3,5,9,12], target = 2
// Output: -1
// Explanation: 2 does not exist in nums so return -1

package p704

import leetcode.Helpers.pp

// object Solution {
//   def search(nums: Array[Int], target: Int): Int = {
//     var left = 0
//     var right = nums.length - 1
//     while (left <= right) {
//       val mid = left + (right - left) / 2
//       if (nums(mid) == target) return mid
//       else if (nums(mid) < target) left = mid + 1
//       else right = mid - 1
//     }
//     -1
//   }
// }

object Solution {
  def search(nums: Array[Int], target: Int): Int = {
    val left = 0
    val right = nums.length - 1
    def go(left: Int, right: Int): Int = {
      val mid = left + (right - left) / 2
      if (nums(mid) == target) return mid
      if (left >= right) return -1
      if (nums(mid) < target) return go(mid + 1, right)
      else return go(left, mid - 1)
    }
    go(left, right)
  }
}

object Main {
  def main(args: Array[String]): Unit = {
    val nums1 = Array(-1, 0, 3, 5, 9, 12)
    val target1 = 9
    println("Example 1")
    println(s"Input: nums=${pp(nums1)}, target=${pp(target1)}")
    println(s"Output: ${pp(Solution.search(nums1, target1))}")
    println(s"Correct: ${pp(4)}")

    val nums2 = Array(-1, 0, 3, 5, 9, 12)
    val target2 = 2
    println("Example 2")
    println(s"Input: nums=${pp(nums2)}, target=${pp(target2)}")
    println(s"Output: ${pp(Solution.search(nums2, target2))}")
    println(s"Correct: ${pp(-1)}")
  }
}
