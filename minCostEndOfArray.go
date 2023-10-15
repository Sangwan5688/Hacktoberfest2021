package main

import "fmt"

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func minCostToReachEnd(cost []int) int {
	n := len(cost)
	dp := make([]int, n)

	for i := 2; i < n; i++ {
		dp[i] = min(dp[i-1]+cost[i-1], dp[i-2]+cost[i-2])
	}

	return min(dp[n-1]+cost[n-1], dp[n-2]+cost[n-2])
}

func main() {
	cost := []int{1, 100, 1, 1, 1, 100, 1, 1, 100}
	fmt.Println(minCostToReachEnd(cost)) // Output: 6
}
