/*
    TODO: Longest Palindromic Subsequence
    ? https://practice.geeksforgeeks.org/problems/longest-palindromic-subsequence-1612327878/1
*/

#include "bits/stdc++.h"
using namespace std;

//! tab
class Solution{
  public:
    int pre(int n, int m, string s1, string s2) {
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
    int longestPalinSubseq(string s1) {
        string s2 = s1;
        reverse(s2.begin(),s2.end());
        return pre(s1.size(),s2.size(),s1,s2);
    }
};