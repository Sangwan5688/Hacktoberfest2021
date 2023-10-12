/*
    TODO: Coin Change : min no of ways
    ? https://leetcode.com/problems/coin-change/description/
*/

#include "bits/stdc++.h"
using namespace std;

//! memo
class Solution {
public:
    vector<vector<int>> dp;
    int pre(int n, int amount, vector<int>& coins) {
        if(amount == 0) return 0;
        if(n == 0) return 1e9;
        if(dp[n][amount] != -1) return dp[n][amount];

        if(coins[n-1] <= amount)
            return dp[n][amount] = min(1 + pre(n,amount-coins[n-1],coins), 
                pre(n-1,amount,coins));
        else return dp[n][amount] = pre(n-1,amount,coins);
    }
    int coinChange(vector<int>& coins, int amount) {
        sort(coins.begin(),coins.end());
        int n = coins.size();
        dp.resize(n+2, vector<int> (amount+2,-1));
        int ans = pre(n,amount,coins);
        return ans == 1e9 ? -1 : ans;
    }
};

//! tab
class Solution {
public:
    vector<vector<int>> dp;
    int coinChange(vector<int>& coins, int amount) {
        sort(coins.begin(),coins.end());
        int n = coins.size();
        dp.resize(n+2, vector<int> (amount+2,0));
        
        for(int j=1;j<=amount;j++) dp[0][j] = 1e9;

        for(int i=1;i<=n;i++){
            for(int j=1;j<=amount;j++){
                if(coins[i-1] <= j) dp[i][j] = min(1+dp[i][j-coins[i-1]],dp[i-1][j]);
                else dp[i][j] = dp[i-1][j];
            }
        }

        return dp[n][amount] == 1e9 ? -1 : dp[n][amount];
    }
};