/*
    TODO: Longest Common Substring
    ? https://practice.geeksforgeeks.org/problems/longest-common-substring1452/1
*/

#include "bits/stdc++.h"
using namespace std;

//! tab
class Solution{
    public:
    
    int longestCommonSubstr (string s1, string s2, int n, int m){
        vector<vector<int>> dp(n+2, vector<int> (m+2,0));
        
        for(int i=1;i<=n;i++){
            for(int j=1;j<=m;j++){
                if(s1[i-1] == s2[j-1])
                    dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = 0;
            }
        }
        
        int ans = 0;
        for(auto arr : dp) for(auto i : arr) ans = max(ans,i);
        return ans;
    }
};
