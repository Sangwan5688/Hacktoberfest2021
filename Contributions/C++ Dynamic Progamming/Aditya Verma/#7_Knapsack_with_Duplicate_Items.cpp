/*
    TODO: Knapsack with Duplicate Items
    ? https://practice.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1
*/

#include "bits/stdc++.h"
using namespace std;

//! memo
class Solution {
public:
    vector<vector<int>> dp;
    int pre(int n, int W, int val[], int wt[]) {
        if(n == 0 or W == 0) return dp[n][W] = 0;
        if(dp[n][W] != -1) return dp[n][W];
        
        if(wt[n-1] <= W)
            return dp[n][W] = max(val[n-1] + pre(n,W-wt[n-1],val,wt), pre(n-1,W,val,wt));
        else
            return dp[n][W] = pre(n-1,W,val,wt);
    }
    int knapSack(int n, int W, int val[], int wt[]) {
        dp.resize(n+2, vector<int> (W+2,-1));
        return pre(n,W,val,wt);
    }
};

//! tab
class Solution {
public:
    vector<vector<int>> dp;
    int knapSack(int n, int W, int val[], int wt[]) {
        dp.resize(n+2, vector<int> (W+2,0));
        
        for(int i=1;i<=n;i++){
            for(int j=1;j<=W;j++){
                if(wt[i-1] <= j) 
                    dp[i][j] = max(val[i-1] + dp[i][j - wt[i-1]], dp[i-1][j]);
                else dp[i][j] = dp[i-1][j];
            }
        }
        
        return dp[n][W];
    }
};