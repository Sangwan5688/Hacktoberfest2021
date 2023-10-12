/*
    TODO: Shortest Common Supersequence
    ? https://leetcode.com/problems/shortest-common-supersequence/description/
*/

#include "bits/stdc++.h"
using namespace std;
 
//! tab
class Solution {
public:
    string lcs(string s1, string s2, int n, int m) { 
        vector<vector<int>> dp(n+2, vector<int> (m+2,0));
        for(int i=1;i<=n;i++){
            for(int j=1;j<=m;j++){
                if(s1[i-1] == s2[j-1])
                    dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }

        int i=n,j=m;
        string ans = "";
        while(i >= 1 and j >= 1){
            if(s1[i-1] == s2[j-1]) ans.push_back(s1[i-1]), i--, j--;
            else if(dp[i-1][j] > dp[i][j-1]) i--;
            else j--;
        }
        reverse(ans.begin(),ans.end());
        return ans;
    }
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size(), m = str2.size();
        string common = lcs(str1,str2,n,m);
        string ans = "";
        int ind1 = 0, ind2 = 0, ind = 0;
        while(ind1 < str1.size() and ind2 < str2.size() and ind < common.size()) {
            while(str1[ind1] != common[ind]) ans.push_back(str1[ind1++]);
            ind1++;
            while(str2[ind2] != common[ind]) ans.push_back(str2[ind2++]);
            ind2++;
            ans.push_back(common[ind++]);
        }
        while(ind1 < str1.size()) ans.push_back(str1[ind1++]);
        while(ind2 < str2.size()) ans.push_back(str2[ind2++]);
        return ans;
    }
};