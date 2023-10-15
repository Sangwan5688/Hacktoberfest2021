def count_ways_to_tile(n):
    if n <= 2:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2

    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]

n = int(input("Enter the value of n: "))
ways = count_ways_to_tile(n)
print(f"Number of ways to tile a 2*{n} board: {ways}")
