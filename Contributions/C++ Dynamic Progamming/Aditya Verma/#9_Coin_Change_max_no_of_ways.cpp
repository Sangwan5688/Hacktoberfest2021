/*
    TODO: Coin Change : max no of ways
    ? https://practice.geeksforgeeks.org/problems/coin-change2448/1
*/

#include "bits/stdc++.h"
using namespace std;

//! memo
class Solution {
  public:
    typedef long long int ll;
    vector<vector<ll>> dp;
    ll pre(int n, int sum, int coins[]) {
        if(n == 0 and sum == 0) return 1;
        if(n == 0) return 0;
        if(dp[n][sum] != -1) return dp[n][sum];
        
        if(coins[n-1] <= sum)
            return dp[n][sum] = pre(n,sum - coins[n-1],coins) + pre(n-1,sum,coins);
        else return dp[n][sum] = pre(n-1,sum,coins);
    }
    ll count(int coins[], int N, int sum) {
        dp.resize(N+2, vector<ll> (sum+2,-1));
        return pre(N,sum,coins);
    }
};

//! tab
class Solution {
  public:
    typedef long long int ll;
    vector<vector<ll>> dp;
    ll count(int coins[], int N, int sum) {
        dp.resize(N+2, vector<ll> (sum+2,0));
        dp[0][0] = 1;
        
        for(int i=1;i<=N;i++){
            for(int j=0;j<=sum;j++){
                if(coins[i-1] <= j)
                    dp[i][j] = dp[i][j-coins[i-1]] + dp[i-1][j];
                else dp[i][j] = dp[i-1][j];
            }
        }
        return dp[N][sum];
    }
};