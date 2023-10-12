/*
    TODO: Longest Common Subsequence
    ? https://practice.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1
*/

#include "bits/stdc++.h"
using namespace std;

//! memo
class Solution{
    public:
    vector<vector<int>> dp;
    int pre(int i, int j, string s1, string s2) {
        if(i == 0 or j == 0) return 0;
        if(dp[i][j] != -1) return dp[i][j];
        
        if(s1[i-1] == s2[j-1])
            return dp[i][j] = 1 + pre(i-1,j-1,s1,s2);
        else return dp[i][j] = max(pre(i-1,j,s1,s2), pre(i,j-1,s1,s2));
    }
    int lcs(int i, int j, string s1, string s2) {
        dp.resize(i+2, vector<int> (j+2,-1));
        return pre(i,j,s1,s2);
    }
};


//! tab
class Solution{
    public:
    vector<vector<int>> dp;
    int lcs(int n, int m, string s1, string s2) {
        dp.resize(n+2, vector<int> (m+2,0));
        
        for(int i=1;i<=n;i++){
            for(int j=1;j<=m;j++){
                if(s1[i-1] == s2[j-1])
                    dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
        
        return dp[n][m];
    }
};
