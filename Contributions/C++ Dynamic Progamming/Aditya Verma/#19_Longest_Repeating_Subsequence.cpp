/*
    TODO: Shortest Common Supersequence
    ? https://leetcode.com/problems/shortest-common-supersequence/description/
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
                if(s1[i-1] == s2[j-1] and i != j) dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
        return dp[n][m];
    }
	int LongestRepeatingSubsequence(string s1){
	   // map<char,int> mp;
	   // for(auto i : s1) mp[i]++;
	    int n = s1.size();
	    return lcs(n,n,s1,s1);
	}
};