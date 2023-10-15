#include <stdio.h>

// Function to count the number of ways to tile a 2*n board
int countWaysToTile(int n) {
    if (n <= 2)
        return n;

    int dp[n + 1];
    dp[1] = 1;
    dp[2] = 2;

    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

int main() {
    int n;
    printf("Enter the value of n: ");
    scanf("%d", &n);

    int ways = countWaysToTile(n);
    printf("Number of ways to tile a 2*%d board: %d\n", n, ways);

    return 0;
}
