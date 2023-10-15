#include <iostream>
#include <vector>

using namespace std;

// Function to count the number of ways to tile a 2*n board
int countWaysToTile(int n) {
    if (n <= 2)
        return n;

    vector<int> dp(n + 1);
    dp[1] = 1;
    dp[2] = 2;

    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

int main() {
    int n;
    cout << "Enter the value of n: ";
    cin >> n;

    int ways = countWaysToTile(n);
    cout << "Number of ways to tile a 2*" << n << " board: " << ways << endl;

    return 0;
}
