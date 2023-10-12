/*
    TODO: Subset Sum Problem
    ? https://practice.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1
*/

#include "bits/stdc++.h"
using namespace std;

//! Memorization ( we can also declare arr[W][n])
class Solution {
public:
    vector<vector<int>> dp;
    int pre(int n, int sumi, int arr[]) {
        if(sumi == 0) return true;
        if(n < 0 or sumi < 0) return false;
        if(dp[n][sumi] != -1) return dp[n][sumi];
        
        if(arr[n-1] <= sumi) 
            return dp[n][sumi] = pre(n-1,sumi - arr[n-1],arr) or pre(n-1,sumi,arr);
        else return dp[n][sumi] = pre(n-1,sumi,arr);
    }
    int isSubsetSum(int n, int sumi, int arr[]) {
        dp.resize(n+2, vector<int> (sumi+2,-1));
        return pre(n,sumi,arr);
    }
    int equalPartition(int n, int arr[]) {
        int sumi = 0;
        for(int i=0;i<n;i++) sumi += arr[i];
        if(sumi&1) {
            return false;
        } else return isSubsetSum(n,sumi/2,arr);
    }
};

//! Tabulation
class Solution {
public:
    vector<vector<int>> dp;
    int pre(int n, int sumi, int arr[]) {
        if(sumi == 0) return true;
        if(n < 0 or sumi < 0) return false;
        if(dp[n][sumi] != -1) return dp[n][sumi];
        
        if(arr[n-1] <= sumi) 
            return dp[n][sumi] = pre(n-1,sumi - arr[n-1],arr) or pre(n-1,sumi,arr);
        else return dp[n][sumi] = pre(n-1,sumi,arr);
    }
    int isSubsetSum(int n, int sumi, int arr[]) {
        dp.resize(n+2, vector<int> (sumi+2,-1));
        
        for(int i=0;i<=n;i++){
            for(int j=0;j<=sumi;j++){
                if(j == 0) dp[i][j] = true;
                else if(i == 0) dp[i][j] = false;
                else {
                    if(arr[i-1] <= j) dp[i][j] = dp[i-1][j - arr[i-1]] or dp[i-1][j];
                    else dp[i][j] = dp[i-1][j];
                }
            }
        }
        return dp[n][sumi];
    }
    int equalPartition(int n, int arr[]) {
        int sumi = 0;
        for(int i=0;i<n;i++) sumi += arr[i];
        if(sumi&1) {
            return false;
        } else return isSubsetSum(n,sumi/2,arr);
    }
};