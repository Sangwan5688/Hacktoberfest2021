/**
 * This is a template to copy paste and reduce keystrokes
 * Imagine you have a special keyboard with the following keys:
 * Key 1: (A): Prints one 'A' on screen.
 * Key 2: (Ctrl-A): Select the whole screen.
 * Key 3: (Ctrl-C): Copy selection to buffer.
 * Key 4: (Ctrl-V): Print buffer on screen appending it after what has already been printed.
 * Now, you can only press the keyboard for N times (with the above four keys),
 * find out the maximum numbers of 'A' you can print on screen.
 * Example 1:
 * Input: N = 3
 * Output: 3
 * Explanation:
 * We can at most get 3 A's on screen by pressing following key sequence:
 * A, A, A
 * Example 2:
 * Input: N = 7
 * Output: 9
 * Explanation:
 * We can at most get 9 A's on screen by pressing following key sequence:
 * A, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V
 * Note:
 *
 * 1 <= N <= 50
 * Answers will be in the range of 32-bit signed integer.
 */

class Solution_4_keys_keyboard {

    // T:O(n^2) S:O(n) ~= O(1)
    // the optimal operations must end with Ctrl A, Ctrl C, Ctrl V x k
    // and operations of Ctrl A, Ctrl C, Ctrl V x k has size j, which will contribute as multiple (j - 1)
    // so we iterate possible size of last Ctrl A, Ctrl C, Ctrl V x k operations and get max value of it
    fun maxA1(n: Int): Int {
        val dp = MutableList(n + 1, { it })
        (7.until(n + 1)).forEach { i ->
            (3.until(i - 2)).forEach { j ->
                dp[i] = maxOf(dp[i], dp[i - j] * (j - 1))
            }
        }
        return dp.last()
    }

    // T:O(1) S:O(1)
    // so considering operations with size x contributing *(x-1)
    // its 'contributing factor(cf)' = (x-1)^(1/x), where values list below
    // x=2 cf=1，x=3 cf=1.26，x=4 cf=1.316，x=5 cf=1.320，x=6 cf=1.308
    // so to max the output we should try to use as much 4 and 5 as we can, which multiplies as 3 and 4
    // also we assume initial several As should be size of 3 or 4
    // so to get max number of 4 we have:
    // 4 * (k + 1) - delta = N - k, where 0 <= delta <= 4
    // k = (N + delta - 4) / 5 = N / 5
    // where k is the number of groups of Ctrl A, Ctrl C, Ctrl Vs operations
    // plus 1 because we classify initial As also as it is a group of operations, namely factors = k + 1
    // so we have:
    // factors = factorOfThree + factorOfFour ...(1)
    // N + 1 = 4 * factorOfThree + 5 * factorOfFour ...(2)
    // plus 1 here because initial As are 1 step more efficient than operations (e.g. 3 steps to *3 instead of 4 steps)
    // 5 x (1) - (2) => 5*factors - N - 1 = factorOfThree
    // 10 is exception here because from calculation its factorOfFour = -1 which is impossible
    fun maxA2(n: Int): Int = when (n) {
        in Int.MIN_VALUE..6 -> n
        10 -> 20
        else -> {
            val factors = n / 5 + 1
            val factorOfThree = 5 * factors - n - 1
            val factorOfFour = factors - factorOfThree
            3.pow(factorOfThree) * 4.pow(factorOfFour)
        }
    }

    // only consider i >= 0 here because I should've used Math lib but cannot
    private fun Int.pow(b: Int): Int {
        if (b == 0) return 1
        if (b == 1) return this
        return if (b % 2 == 0)
            (this * this).pow(b / 2) //even a=(a^2)^b/2
        else
            this * ((this * this).pow(b / 2)) //odd  a=a*(a^2)^b/2
    }

    // T:O(n) S:O(1)
    // another DP solution based on math conclusion
    // every time try multiple with either 3 or 4 and get max of it
    fun maxA3(n: Int): Int {
        if (n < 7) {
            return n
        }
        val dp = MutableList(7, { it })
        (7.until(n + 1)).forEach {
            dp[it % 7] = maxOf(dp[(it - 4) % 7] * 3, dp[(it - 5) % 7] * 4)
        }
        return dp[n % 7]
    }
}


fun main(args: Array<String>) {
    val s = Solution_4_keys_keyboard()
    (1.until(51)).forEach {
        if (s.maxA1(it) != s.maxA2(it) || s.maxA1(it) != s.maxA3(it)) {
            print("error")
        }
    }
}