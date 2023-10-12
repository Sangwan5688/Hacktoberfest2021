/*
    TODO: Form a palindrome
    ? https://practice.geeksforgeeks.org/problems/form-a-palindrome1455/1
*/

#include "bits/stdc++.h"
using namespace std;
 
//! tab
class Solution{
  public:
    int lcs(int n, int m, string s1, string s2) {
        vector<vector<int>> dp(n+2, vector<int> (m+2,0));
        for(int i=1;i<=n;i++){
            for(int j=1;j<=m;j++){
                if(s1[i-1] == s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
        return dp[n][m];
    }
    int countMin(string s1){
        string s2 = s1;
        reverse(s2.begin(),s2.end());
        int n = s1.size();
        return n - lcs(n,n,s1,s2);
    }
};