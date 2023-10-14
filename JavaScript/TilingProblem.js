function countWaysToTile(n) {
    if (n <= 2) {
        return n;
    }

    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

const n = prompt("Enter the value of n:");
const ways = countWaysToTile(parseInt(n, 10));

console.log(`Number of ways to tile a 2*${n} board: ${ways}`);
