/*
    TODO: 0 - 1 Knapsack Problem
    ? https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1
*/

#include "bits/stdc++.h"
using namespace std;

//! Recursive
class Solution{
    public:
    int knapSack(int W, int wt[], int val[], int n) 
    { 
       if(W == 0 or n == 0) return 0;
       if(wt[n-1] <= W) return max(val[n-1] + knapSack(W-wt[n-1],wt,val,n-1),
            knapSack(W,wt,val,n-1));
        else return knapSack(W,wt,val,n-1);
    }
};

//! Memorization ( we can also declare arr[W][n])
class Solution{
    public:
    int pre(int W, int wt[], int val[], int n, vector<vector<int>>& dp) { 
       if(W == 0 or n == 0) return 0;
       if(dp[n][W] != -1) return dp[n][W];
       if(wt[n-1] <= W) return dp[n][W] = max(val[n-1] + pre(W-wt[n-1],wt,val,n-1,dp),
            pre(W,wt,val,n-1,dp));
        else return dp[n][W] = pre(W,wt,val,n-1,dp);
    }
    int knapSack(int W, int wt[], int val[], int n) { 
        vector<vector<int>> dp(n+2, vector<int> (W + 2,-1));
        return pre(W,wt,val,n,dp);
    }
};

//! Tabulation
class Solution {
    public:
    int knapSack(int W, int wt[], int val[], int n) { 
        vector<vector<int>> dp(n+2, vector<int> (W + 2,-1));
        
        for(int i=0;i<=n;i++){
            for(int j=0;j<=W;j++){
                if(i == 0 or j == 0) dp[i][j] = 0;
                else{
                    if(wt[i-1] <= j)
                        dp[i][j] = max(val[i-1] + dp[i-1][j - wt[i-1]],dp[i-1][j]);
                    else
                        dp[i][j] = dp[i-1][j];
                }
            }
        }
        return dp[n][W];
    }
};