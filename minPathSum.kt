fun minPathSum(grid: Array<IntArray>): Int {
    val m = grid.size
    val n = grid[0].size

    val dp = Array(m) { IntArray(n) }

    for (i in 0 until m) {
        for (j in 0 until n) {
            if (i == 0 && j == 0) {
                dp[i][j] = grid[i][j]
            } else if (i == 0) {
                dp[i][j] = dp[i][j - 1] + grid[i][j]
            } else if (j == 0) {
                dp[i][j] = dp[i - 1][j] + grid[i][j]
            } else {
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
            }
        }
    }

    return dp[m - 1][n - 1]
}
