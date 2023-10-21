/**
 * This is a template to copy paste and reduce keystrokes
 * You have 4 cards each containing a number from 1 to 9.
 * You need to judge whether they could operated through *, /, +, -, (, ) to get the value of 24.
 * Example 1:
 * Input: [4, 1, 8, 7]
 * Output: True
 * Explanation: (8-4) * (7-1) = 24
 * Example 2:
 * Input: [1, 2, 1, 2]
 * Output: False
 * Note:
 *
 * The division operator / represents real division, not integer division. For example, 4 / (1 - 2/3) = 12.
 * Every operation done is between two numbers. In particular, we cannot use - as a unary operator.
 * For example, with [1, 1, 1, 1] as input, the expression -1 - 1 - 1 - 1 is not allowed.
 * You cannot concatenate numbers together. For example, if the input is [1, 2, 1, 2], we cannot write this as 12 + 12.
 */

import java.lang.Math.abs

class Solution_24_game {

    // T:O(n^3 * 4^n) ~= O(1) as n = 4
    // S:O(n^2) ~= O(1) as n = 4
    fun judgePoint24(nums: IntArray): Boolean = helper(nums.map { it.toDouble() }.toMutableList())

    // because previous nums is immutable we need a mutable one, also we need to set double type
    fun helper(nums: MutableList<Double>): Boolean {
        val eps = 1e-6
        if (nums.size == 1 && abs(nums[0] - 24) <= eps) {
            return true
        }
        for (i in 0.until(nums.size)) {
            0.until(nums.size).forEach { j ->
                if (i == j) {
                    // kotlin breaks and jumps is a headache BTW
                    return@forEach
                }
                // rest of nums
                val nextNums = mutableListOf<Double>()
                0.until(nums.size).forEach {
                    if (it != i && it != j) {
                        nextNums.add(nums[it])
                    }
                }
                val ops = listOf("+", "-", "*", "/")
                ops.forEach inner@ {
                    // we avoid repeating + and * by only calculating this when i < j
                    // also skip x/0 situations
                    if (((it == "*" || it == "+") && j > i)
                            || (it == "/") && abs(nums[j]) <= 1e-6) {
                        return@inner
                    }
                    nextNums.add(
                            when (it) {
                                "+" -> nums[i] + nums[j]
                                "-" -> nums[i] - nums[j]
                                "*" -> nums[i] * nums[j]
                                "/" -> nums[i] / nums[j]
                                else -> 0.0
                            }
                    )
                    if (helper(nextNums)) {
                        return true
                    }
                    nextNums.removeAt(nextNums.lastIndex)
                }
            }
        }
        return false
    }
}

fun main(args: Array<String>) {
    val s = Solution_24_game()
    // LC OJ passed
    print(s.judgePoint24(intArrayOf(1, 1, 1, 1)))
    print(s.judgePoint24(intArrayOf(1, 2, 3, 4)))
    print(s.judgePoint24(intArrayOf(4, 1, 8, 7)))
    print(s.judgePoint24(intArrayOf(1, 2, 1, 2)))
}