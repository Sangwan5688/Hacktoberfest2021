/*
    TODO: Matrix Chain Multiplication
    ? https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1
*/

#include "bits/stdc++.h"
using namespace std;
 
//! tab
class Solution{
public:
    vector<vector<int>> dp;
    int pre(int i, int j, int arr[]) {
        if(i >= j) return 0;
        if(dp[i][j] != -1) return dp[i][j];
        
        int ans = 1e9;
        for(int k=i;k<j;k++) {
            int temp = (arr[i-1]*arr[k]*arr[j]) + pre(i,k,arr) + pre(k+1,j,arr);
            ans = min(ans,temp);
        }
        return dp[i][j] = ans;
    }
    int matrixMultiplication(int n, int arr[]) {
        dp.resize(n+2, vector<int> (n+2,-1));
        return pre(1,n-1,arr);
    }
};


class Solution{
public:
    vector<vector<int>> dp;
    int matrixMultiplication(int n, int arr[]) {
        dp.resize(n+2, vector<int> (n+2,0));
        
        for(int i=n-1;i>=1;i--){
            for(int j=1;j<=n;j++){
                
                if(i < j) {
                    int ans = 1e9;
                    for(int k=i;k<j;k++){
                        int temp = (arr[i-1]*arr[k]*arr[j]) + dp[i][k] + dp[k+1][j];
                        ans = min(ans,temp);
                    }
                    dp[i][j] = ans;
                }
                
            }
        }
        return dp[1][n-1];
    }
};