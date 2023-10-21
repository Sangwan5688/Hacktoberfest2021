/**
 * Given an array S of n integers,
 * are there elements a, b, c in S such that a + b + c = 0?
 * Find all unique triplets in the array which gives the sum of zero.
 *
 * Note:
 * Elements in a triplet (a,b,c) must be in non-descending order. (ie, a <= b <= c)
 * The solution set must not contain duplicate triplets.
 *    For example, given array S = {-1 0 1 2 -1 -4},
 *
 *    A solution set is:
 *    (-1, 0, 1)
 *    (-1, -1, 2)
 */

data class triple(val first: Int, val second: Int, val third: Int) {
    override fun toString(): String {
        return "($first, $second, $third)"
    }
}

class Solution_3sum {
    // T:O(n^2) S:O(1)
    // the key of this problem is to avoid repetitive triples elegantly
    fun getThreeSumSets(arr: Array<Int>): List<triple> {
        arr.sort()
        val ret = arrayListOf<triple>()
        var j: Int
        var k: Int
        for (i in 0..(arr.size - 3)) {
            if (i != 0 && arr[i] == arr[i - 1])
                continue
            j = i + 1
            k = arr.size - 1
            fun threeSum() = arr[i] + arr[j] + arr[k]
            while (j < k)
                when {
                    threeSum() > 0 -> k--
                    threeSum() < 0 -> j++
                    threeSum() == 0 -> {
                        ret.add(triple(arr[i], arr[j], arr[k]))
                        j++
                        k--
                        while (j < k && arr[j] == arr[j - 1])
                            j++
                        while (j < k && arr[k] == arr[k + 1])
                            k--
                    }
                }
        }
        return ret
    }
}

fun main(args: Array<String>) {
    val s = Solution_3sum()
    for (t in s.getThreeSumSets(arrayOf(-1, 0, 1, 2, -1, -4)))
        println(t)
}
