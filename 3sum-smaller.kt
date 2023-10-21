/**
 * Given an array of n integers nums and a target
 *
 * find the number of index triplets i, j, k with 0 <= i < j < k < n
 *
 * that satisfy the condition nums_i + nums_j + nums_k < target.
 *
 * For example, given nums = [-2, 0, 1, 3], and target = 2.
 *
 * Return 2. Because there are two triplets which sums are less than 2:
 *
 * [-2, 0, 1]
 * [-2, 0, 3]
 *
 * Follow up:
 * Could you solve it in O(n^2) runtime?
 */

class Solution_3sum_smaller {
    // T:O(n^2) S:O(1)
    fun getSmallerSumCnt(arr: Array<Int>, t: Int): Int {
        arr.sort()
        var j: Int
        var k: Int
        var cnt = 0
        for (i in 0..(arr.size - 3)) {
            j = i + 1
            k = arr.size - 1
            fun threeSum() = arr[i] + arr[j] + arr[k]
            while (j < k)
                when {
                    threeSum() < t -> {
                        cnt += k - j
                        j++
                    }
                    threeSum() >= t -> k--
                }
        }

        return cnt
    }
}

fun main(args: Array<String>) {
    val s = Solution_3sum_smaller()
    println(s.getSmallerSumCnt(arrayOf(-2, 0, 1, 3), 2))
}
