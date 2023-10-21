/**
 * Given an array S of n integers,
 * are there elements a, b, c, and d in S such that a + b + c + d = target?
 * Find all unique quadruplets in the array which gives the sum of target.
 *
 * Note:
 * Elements in a quadruplet (a,b,c,d) must be in non-descending order. (ie, a <= b <= c <= d)
 * The solution set must not contain duplicate quadruplets.
 * For example, given array S = {1 0 -1 0 -2 2}, and target = 0.
 *
 *   A solution set is:
 *    (-1,  0, 0, 1)
 *    (-2, -1, 1, 2)
 *    (-2,  0, 0, 2)
 */
data class quadruplet(val a: Int, val b: Int, val c: Int, val d: Int) {
    override fun toString(): String {
        return "($a, $b, $c, $d)"
    }
}

class Solution_4sum {
    // T:O(n^2*p) S:O(n^2*p)
    fun get4SumSets(arr: Array<Int>, t: Int): List<quadruplet> {
        val ret = arrayListOf<quadruplet>()
        // a ret map to check if set already exists
        val retMap = hashMapOf<String, Boolean>()
        arr.sort()
        // 2sum-index pair map
        val map = hashMapOf<Int, HashSet<Pair<Int, Int>>>()
        for (i in 0..(arr.size - 2))
            for (j in (i + 1)..(arr.size - 1)) {
                when {
                    t - arr[i] - arr[j] in map -> {
                        // here we use forEach, equivalent to for loop
                        map[t - arr[i] - arr[j]]?.forEach {
                            // we already have: first < second, i < j, and first <= i
                            // try to avoid reusing same index here

                            // compare this approach with below commented code
                            // because array is sorted, there must exist naturally ordered quadruplets
                            // so just care about those results and leave out rest
                            if (i > it.second) {
                                val temp: quadruplet = quadruplet(arr[it.first], arr[it.second], arr[i], arr[j])
                                // check if already existed
                                if (temp.toString() !in retMap) {
                                    retMap.put(temp.toString(), true)
                                    ret.add(temp)
                                }
                            }
//                            if (i != it.second && j != it.second && i != it.first) {
//                                val temp: quadruplet
//                                when {
//                                // keep values ordered
//                                    it.second in i..j
//                                    -> temp = quadruplet(arr[it.first], arr[i], arr[it.second], arr[j])
//                                    it.second < i
//                                    -> temp = quadruplet(arr[it.first], arr[it.second], arr[i], arr[j])
//                                    else -> temp = quadruplet(arr[it.first], arr[i], arr[j], arr[it.second])
//                                }
//                                // check if already existed
//                                if (temp.toString() !in retMap) {
//                                    retMap.put(temp.toString(), true)
//                                    ret.add(temp)
//                                }
//                            }
                        }
                    }
                    else -> {
                        when {
                            arr[i] + arr[j] in map -> map[arr[i] + arr[j]]?.add(Pair(i, j))
                            else -> map.put(arr[i] + arr[j], hashSetOf(Pair(i, j)))
                        }
                    }
                }
            }

        return ret
    }
}

fun main(args: Array<String>) {
    val s = Solution_4sum()
    for (e in s.get4SumSets(arrayOf(1, 0, -1, 0, -2, 2), 0))
        println(e.toString())
}
