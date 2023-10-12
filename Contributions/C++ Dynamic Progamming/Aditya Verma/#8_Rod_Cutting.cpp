/*
    TODO: Rod Cutting
    ? https://practice.geeksforgeeks.org/problems/rod-cutting0840/1
*/

#include "bits/stdc++.h"
using namespace std;

//! memo
class Solution{
  public:
    vector<vector<int>> dp;
    int pre(int n, int W, int price[]) {
        if(n == 0 or W == 0) return 0;
        if(dp[n][W] != -1) return dp[n][W];
        
        if(n <= W) 
            return dp[n][W] = max(price[n-1] + pre(n,W - (n),price), pre(n-1,W,price));
        else return dp[n][W] = pre(n-1,W,price);
    }
    int cutRod(int price[], int n) {
        dp.resize(n+2, vector<int> (n+2, -1));
        return pre(n,n,price);
    }
};

//! tab
class Solution{
  public:
    vector<vector<int>> dp;
    int cutRod(int price[], int n) {
        dp.resize(n+2, vector<int> (n+2, 0));
        
        for(int i=1;i<=n;i++){
            for(int j=1;j<=n;j++){
                if(i <= j)
                    dp[i][j] = max(price[i-1] + dp[i][j - i], dp[i-1][j]);
                else dp[i][j] = dp[i-1][j];
            }
        }
        
        return dp[n][n];
    }
};