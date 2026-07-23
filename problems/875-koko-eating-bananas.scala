// Input: piles = [3,6,7,11], h = 8
// Output: 4

// Input: piles = [30,11,23,4,20], h = 5
// Output: 30

// Input: piles = [30,11,23,4,20], h = 6
// Output: 23

//> using file helpers.scala

package p875

import leetcode.Helpers.pp

object Solution {
  def minEatingSpeed(piles: Array[Int], h: Int): Int = {

    def haveEnoughTime(speed: Int): Boolean = {
      piles.foldLeft(0) { (total, pile) =>
        total + (pile + speed - 1) / speed
      } <= h
    }

    @annotation.tailrec
    def go(left: Int, right: Int): Int = {
      if left >= right then return left
      val middle = left + (right - left) / 2
      if haveEnoughTime(middle) then go(left, middle)
      else go(middle + 1, right)
    }

    go(1, piles.max)
  }
}

object Main {
  def main(args: Array[String]): Unit = {
    val piles1 = Array(3, 6, 7, 11)
    val h1 = 8
    println("Example 1")
    println(s"Input: piles=${pp(piles1)}, h=${pp(h1)}")
    println(s"Output: ${pp(Solution.minEatingSpeed(piles1, h1))}")
    println(s"Correct: ${pp(4)}")

    val piles2 = Array(30, 11, 23, 4, 20)
    val h2 = 5
    println("Example 2")
    println(s"Input: piles=${pp(piles2)}, h=${pp(h2)}")
    println(s"Output: ${pp(Solution.minEatingSpeed(piles2, h2))}")
    println(s"Correct: ${pp(30)}")

    val piles3 = Array(30, 11, 23, 4, 20)
    val h3 = 6
    println("Example 3")
    println(s"Input: piles=${pp(piles3)}, h=${pp(h3)}")
    println(s"Output: ${pp(Solution.minEatingSpeed(piles3, h3))}")
    println(s"Correct: ${pp(23)}")
  }
}
