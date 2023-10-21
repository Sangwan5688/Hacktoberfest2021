/**
 * This is a template to copy paste and reduce keystrokes
 * Initially on a notepad only one character 'A' is present.
 * You can perform two operations on this notepad for each step:

 * Copy All: You can copy all the characters present on the notepad (partial copy is not allowed).
 * Paste: You can paste the characters which are copied last time.
 * Given a number n. You have to get exactly n 'A' on the notepad
 * by performing the minimum number of steps permitted. Output the minimum number of steps to get n 'A'.
 *
 * Example 1:
 * Input: 3
 * Output: 3
 * Explanation:
 * Initially, we have one character 'A'.
 * In step 1, we use Copy All operation.
 * In step 2, we use Paste operation to get 'AA'.
 * In step 3, we use Paste operation to get 'AAA'.
 * Note:
 * The n will be in the range [1, 1000].
 */

class Solution_2_keys_keyboard {
    fun minSteps(n: Int): Int {
        // get a var copy
        var m = n
        var ret = 0
        // list of prime factors which are smaller than sqrt(1000) = 31.6
        val primList = listOf(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31)
        primList.forEach {
            while (m % it == 0) {
                ret += it
                m /= it
            }
        }
        return ret + if (m == 1) {
            0
        } else {
            m
        }
    }
}

fun main(args: Array<String>) {
    // Leetcode OJ passed
}