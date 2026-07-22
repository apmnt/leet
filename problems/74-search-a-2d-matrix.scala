// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// Output: true

// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
// Output: false

//> using file helpers.scala

package p74

import leetcode.Helpers.pp
import scala.annotation.tailrec

// object Solution {
//   def searchMatrix(matrix: Array[Array[Int]], target: Int): Boolean = {
//     val rows = matrix.length
//     val cols = matrix(0).length
//     var left = 0
//     var right = rows * cols - 1
//     while (left <= right) {
//       val mid = left + (right - left) / 2
//       val value = matrix(mid / cols)(mid % cols)
//       if (value == target) return true
//       else if (value < target) left = mid + 1
//       else right = mid - 1
//     }
//     false
//   }
// }

object Solution {
  def searchMatrix(matrix: Array[Array[Int]], target: Int): Boolean = {
    val rows = matrix.length
    val cols = matrix(0).length
    val left = 0
    val right = rows * cols - 1

    @scala.annotation.tailrec
    def go(left: Int, right: Int): Boolean = {
      if (left > right) return false
      val mid = left + (right - left) / 2
      val value = matrix(mid / cols)(mid % cols)
      if (value == target) return true
      else if (value < target) go(mid + 1, right)
      else go(left, mid - 1)
    }

    go(left, right)
  }
}

object Main {
  def main(args: Array[String]): Unit = {
    val matrix1 =
      Array(Array(1, 3, 5, 7), Array(10, 11, 16, 20), Array(23, 30, 34, 60))
    val target1 = 3
    println("Example 1")
    println(s"Input: matrix=${pp(matrix1)}, target=${pp(target1)}")
    println(s"Output: ${pp(Solution.searchMatrix(matrix1, target1))}")
    println(s"Correct: ${pp(true)}")

    val matrix2 =
      Array(Array(1, 3, 5, 7), Array(10, 11, 16, 20), Array(23, 30, 34, 60))
    val target2 = 13
    println("Example 2")
    println(s"Input: matrix=${pp(matrix2)}, target=${pp(target2)}")
    println(s"Output: ${pp(Solution.searchMatrix(matrix2, target2))}")
    println(s"Correct: ${pp(false)}")
  }
}
