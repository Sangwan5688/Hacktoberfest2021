/*
    TODO: Perfect Sum Problem
    ? https://practice.geeksforgeeks.org/problems/perfect-sum-problem5633/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<vector<int>> dp;
    int minDifference(int nums[], int n)  {
        int sumi = 0;
        for (int i = 0; i < n; i++) sumi += nums[i];
        dp.resize(n + 2, vector<int> (sumi + 2, -1));

        
        for(int j=0;j<=sumi;j++) dp[0][j] = false;
        for(int i=0;i<=n;i++) dp[i][0] = true;
        
        for(int i=1;i<=n;i++){
            for(int j=1;j<=sumi;j++){
                if(nums[i-1] <= j)
                    dp[i][j] = dp[i-1][j-nums[i-1]] or dp[i-1][j];
                else dp[i][j] = dp[i-1][j];
            }
        }
        

        int maxi = 1e9;
        vector<int> arr = dp[n];
        for (int s1 = 0; s1 < arr.size(); s1++) {
            if (arr[s1]) {
                int s2 = sumi - s1;
                maxi = min(maxi, abs(s1 - s2));
            }
        }
        return maxi;
    }
};
