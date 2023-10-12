/*
    TODO: Is Subsequence
    ? https://leetcode.com/problems/is-subsequence/description/
*/

#include "bits/stdc++.h"
using namespace std;
 
//! tab
class Solution {
public:
    int lcs(int n, int m, string s, string t) {
        vector<vector<int>> dp(n+2, vector<int> (m+2,0));
        for(int i=1;i<=n;i++){
            for(int j=1;j<=m;j++){
                if(s[i-1] == t[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
        return dp[n][m];
    }
    bool isSubsequence(string s, string t) {
        int n = s.size(), m = t.size();
        return (s.size() == lcs(n,m,s,t));
    }
};