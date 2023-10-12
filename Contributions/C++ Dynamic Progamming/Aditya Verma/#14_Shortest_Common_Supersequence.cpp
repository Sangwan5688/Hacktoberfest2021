/*
    TODO: Shortest Common Supersequence
    ? https://practice.geeksforgeeks.org/problems/shortest-common-supersequence0322/1
*/

#include "bits/stdc++.h"
using namespace std;

//! tab
class Solution {
    public:
    int lcs(int n, int m, string s1, string s2) {
        vector<vector<int>> dp(n+2, vector<int> (m+2,0));
        
        for(int i=1;i<=n;i++){
            for(int j=1;j<=m;j++){
                if(s1[i-1] == s2[j-1])
                    dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
        
        return dp[n][m];
    }
    int shortestCommonSupersequence(string s1, string s2, int n, int m) {
        return n + m - lcs(n,m,s1,s2);
    }
};