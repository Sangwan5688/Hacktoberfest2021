/*
    TODO: Subset Sum Problem
    ? https://practice.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1
*/

#include "bits/stdc++.h"
using namespace std;

//! Recursive
class Solution {   
public:
    int pre(int n, int sum, vector<int> arr) {
        if(sum == 0) return true;
        if(n < 0 or sum < 0) return false;
        
        if(arr[n-1] <= sum)
            return pre(n-1,sum-arr[n-1],arr) or pre(n-1,sum,arr);
        else return pre(n-1,sum,arr);
    }
    bool isSubsetSum(vector<int> arr, int sum) {
        return pre(arr.size(),sum,arr);
    }
};

//! Memorization ( we can also declare arr[W][n])
class Solution {   
public:
    vector<vector<int>> dp;
    int pre(int n, int sum, vector<int> arr) {
        if(sum == 0) return true;
        if(n < 0 or sum < 0) return false;
        if(dp[n][sum] != -1) return dp[n][sum];
        
        if(arr[n-1] <= sum)
            return dp[n][sum] = pre(n-1,sum-arr[n-1],arr) or pre(n-1,sum,arr);
        else return dp[n][sum] = pre(n-1,sum,arr);
    }
    bool isSubsetSum(vector<int> arr, int sum) {
        int n = arr.size();
        dp.resize(n+2, vector<int> (sum+2,-1));
        return pre(n,sum,arr);
    }
};

//! Tabulation
class Solution{   
public:
    vector<vector<int>> dp;
    bool isSubsetSum(vector<int>arr, int sum){
        int n = arr.size();
        dp.resize(n+2, vector<int> (sum+2,-1));
        
        for(int j=0;j<=sum;j++) dp[0][j] = false;
        for(int i=0;i<=n;i++) dp[i][0] = true;
        
        for(int i=1;i<=n;i++){
            for(int j=1;j<=sum;j++){
                if(arr[i-1] <= j)
                    dp[i][j] = dp[i-1][j - arr[i-1]] or dp[i-1][j];
                else dp[i][j] = dp[i-1][j];
            }
        }
        return dp[n][sum];
    }
};