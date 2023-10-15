function minCostToReachEnd(cost) {
    const n = cost.length;
    const dp = new Array(n);

    for (let i = 2; i < n; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
    }

    return Math.min(dp[n - 1] + cost[n - 1], dp[n - 2] + cost[n - 2]);
}