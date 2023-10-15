fun minCostToReachEnd(cost: IntArray): Int {
    val n = cost.size
    val dp = IntArray(n)

    for (i in 2 until n) {
        dp[i] = minOf(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    }

    return minOf(dp[n - 1] + cost[n - 1], dp[n - 2] + cost[n - 2])
}