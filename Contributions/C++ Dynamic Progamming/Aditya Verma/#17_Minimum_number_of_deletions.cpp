/*
    TODO: Minimum number of deletions
    ? https://practice.geeksforgeeks.org/problems/minimum-number-of-deletions4610/1
*/

#include "bits/stdc++.h"
using namespace std;
 
//! tab
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
int minDeletions(string str, int n) { 
    string str2 = str;
    reverse(str2.begin(),str2.end());
    return n - lcs(str.size(),str2.size(),str,str2);
} 