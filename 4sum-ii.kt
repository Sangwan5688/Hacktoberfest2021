/**
 * Given four lists A, B, C, D of integer values,
 * compute how many tuples (i, j, k, l) there are
 * such that A(i)+ B(j) + C(k) + D(l) is zero.
 *
 * To make problem a bit easier, all A, B, C, D have same length of N where 0 <= N <= 500.
 * All integers are in the range of -228 to 228 - 1 and the result is guaranteed to be at most 231 - 1.
 *
 * Example:
 *
 * Input:
 * A = [ 1, 2]
 * B = [-2,-1]
 * C = [-1, 2]
 * D = [ 0, 2]
 *
 * Output:
 * 2
 *
 * Explanation:
 * The two tuples are:
 * 1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
 * 2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
 */

class Solution_4sum_ii {
    // T:O(n^2) S:O(n^2)
    fun get4SumCount(A: Array<Int>, B: Array<Int>, C: Array<Int>, D: Array<Int>): Int {
        var cnt = 0
        // 2sum-cnt map
        val map = hashMapOf<Int, Int>()

        for (i in A)
            for (j in B)
                map.put(i + j, map.getOrDefault(i + j, 1))

        for (k in C)
            for (L in D)
                if (-k - L in map)
                    cnt += map[-k - L] as Int

        return cnt
    }
}

fun main(args: Array<String>) {
    val s = Solution_4sum_ii()
    println(s.get4SumCount(arrayOf(1, 2), arrayOf(-2, -1), arrayOf(-1, 2), arrayOf(0, 2)))
}
