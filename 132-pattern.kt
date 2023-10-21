/**
 * Given a sequence of n integers a1, a2, ..., an,
 * a 132 pattern is a subsequence ai, aj, ak such that i < j < k and
 * ai < ak < aj. Design an algorithm that takes a list of n numbers as
 * input and checks whether there is a 132 pattern in the list.
 *
 * Note: n will be less than 15,000.
 *
 * Example 1:
 * Input: [1, 2, 3, 4]
 *
 * Output: False
 *
 * Explanation: There is no 132 pattern in the sequence.
 * Example 2:
 * Input: [3, 1, 4, 2]
 *
 * Output: True
 *
 * Explanation: There is a 132 pattern in the sequence: [1, 4, 2].
 * Example 3:
 * Input: [-1, 3, 2, 0]
 *
 * Output: True
 *
 * Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].
 */
import java.util.*

class Solution_132_pattern {

    // T:O(n) S:O(n)
    fun has132Pattern(arr: Array<Int>): Boolean {
        // use stack to store the mid candidates
        val stk: Stack<Int> = Stack()
        // use this parameter to store the right candidate
        var a: Int = arr[arr.size - 1]
        // from right to left
        for (i in (0..(arr.size - 2)).reversed())
            when {
            // if new value is bigger than right candidate, we put it in the mid candidates
            // meanwhile we want to keep right candidate as large as possible
            // so the stack should be a min stack, namely the smaller one at top
                arr[i] > a -> {
                    while (stk.isNotEmpty() && stk.peek() < arr[i]) {
                        a = stk.pop()
                    }
                    stk.add(arr[i])
                }
            // if stack is empty, ignore
                arr[i] < a && stk.isNotEmpty() -> return true
            // ignore equal
            }

        return false
    }
}


fun main(args: Array<String>) {
    val s = Solution_132_pattern()
    println(s.has132Pattern(arrayOf(1, 2, 3, 4)))
    println(s.has132Pattern(arrayOf(3, 1, 4, 2)))
    println(s.has132Pattern(arrayOf(-1, 3, 2, 0)))
}
