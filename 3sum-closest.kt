/**
 * Given an array S of n integers,
 * find three integers in S such that the sum is closest to a given number, target.
 * Return the sum of the three integers.
 * You may assume that each input would have exactly one solution.
 *
 * For example, given array S = {-1 2 1 -4}, and target = 1.
 *
 * The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 */

class Solution_3sum_closest {
    // T:O(n^2) S:O(1)
    fun getClosestSum(arr: Array<Int>, t: Int): Int {
        arr.sort()
        var j: Int
        var k: Int
        var ret = Int.MAX_VALUE
        for (i in 0..(arr.size - 3)) {
            j = i + 1
            k = arr.size - 1
            fun threeSum() = arr[i] + arr[j] + arr[k]
            while (j < k)
                when {
                    threeSum() == t -> return t
                    threeSum() < t -> {
                        ret = if (t - threeSum() < Math.abs(ret - t)) threeSum() else ret
                        j++
                    }
                    threeSum() > t -> {
                        ret = if (threeSum() - t < Math.abs(ret - t)) threeSum() else ret
                        k--
                    }
                }
        }

        return ret
    }
}

fun main(args: Array<String>) {
    val s = Solution_3sum_closest()
    println(s.getClosestSum(arrayOf(-1, 2, 1, 4), 1))
}