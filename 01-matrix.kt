/**
 * Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.
 * The distance between two adjacent cells is 1.
 *
 * Example 1:
 *
 * Input:
 * 0 0 0
 * 0 1 0
 * 0 0 0
 *
 * Output:
 * 0 0 0
 * 0 1 0
 * 0 0 0
 *
 * Example 2:
 *
 * Input:
 * 0 0 0
 * 0 1 0
 * 1 1 1
 *
 * Output:
 * 0 0 0
 * 0 1 0
 * 1 2 1
 *
 * Note:
 * The number of elements of the given matrix will not exceed 10,000.
 * There are at least one 0 in the given matrix.
 * The cells are adjacent in only four directions: up, down, left and right.
 */
import utils.MyDeque

class Solution_01_matrix {
    // T:O(m*n) S:O(m*n) where m, n is the row number and column number of matrix
    fun updateMatrix(m: Array<Array<Int>>): Array<Array<Int>> {

        // use deque to get init 0s
        val deque = MyDeque<Pair<Int, Int>>()
        for (i in 0..(m.size - 1))
            for (j in 0..(m[0].size - 1))
                when (m[i][j]) {
                    0 -> deque.addFirst(Pair(i, j))
                    else -> m[i][j] = Int.MAX_VALUE
                }


        // BFS
        val directions: Array<Pair<Int, Int>> = arrayOf(Pair(1, 0), Pair(0, 1), Pair(-1, 0), Pair(0, -1))
        var element: Pair<Int, Int>
        while (deque.peekFirst() != null) {
            element = deque.getFirst() as Pair<Int, Int>
            var neighbor_i: Int
            var neighbor_j: Int
            var isNeighborValid: Boolean
            for ((k, h) in directions) {
                neighbor_i = element.first + k
                neighbor_j = element.second + h
                isNeighborValid = 0 <= neighbor_i && neighbor_i < m.size && 0 <= neighbor_j && neighbor_j < m[0].size
                when {
                    (isNeighborValid && m[neighbor_i][neighbor_j] > m[element.first][element.second] + 1)
                    -> {
                        deque.addLast(Pair(neighbor_i, neighbor_j))
                        m[neighbor_i][neighbor_j] = m[element.first][element.second] + 1
                    }
                }
            }
        }

        return m
    }

    // DP solution. Need 2 passes, first pass covers left and top path, and second pass covers right and bottom path.
    // T:O(m*n) S:O(1)
    fun updateMatrix2(mat: Array<IntArray>): Array<IntArray> {
        val m = mat.size
        val n = mat[0].size
        // Cannot init to Int.MAX otherwise will overflow
        val ret = Array(m) { IntArray(n) { 100000 } }
        for (i in 0 until m) {
            for (j in 0 until n) {
                if (mat[i][j] == 0) {
                    ret[i][j] = 0
                } else {
                    when {
                        i != 0 && j != 0 -> {
                            ret[i][j] = kotlin.math.min(ret[i - 1][j], ret[i][j - 1]) + 1
                        }

                        i != 0 -> ret[i][j] = ret[i - 1][j] + 1
                        j != 0 -> ret[i][j] = ret[i][j - 1] + 1
                        else -> {}
                    }
                }
            }
        }

        for (i in (0 until m).reversed()) {
            for (j in (0 until n).reversed()) {
                if (mat[i][j] == 0) continue
                when {
                    i != m - 1 && j != n - 1 -> {
                        ret[i][j] = kotlin.math.min(ret[i][j], kotlin.math.min(ret[i + 1][j], ret[i][j + 1]) + 1)
                    }

                    i != m - 1 -> ret[i][j] = kotlin.math.min(ret[i][j], ret[i + 1][j] + 1)
                    j != n - 1 -> ret[i][j] = kotlin.math.min(ret[i][j], ret[i][j + 1] + 1)
                    else -> {}
                }
            }
        }
        return ret
    }
}

fun main(args: Array<String>) {
    val s = Solution_01_matrix()
    val a = arrayOf(
            arrayOf(1, 0, 0, 0),
            arrayOf(1, 1, 0, 0),
            arrayOf(1, 1, 1, 0))
    for (arr in s.updateMatrix(a)) {
        for (i in arr) {
            print(i)
            print(" ")
        }
        println()
    }
}
