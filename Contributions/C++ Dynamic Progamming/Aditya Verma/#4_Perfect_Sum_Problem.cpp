/*
    TODO: Perfect Sum Problem
    ? https://practice.geeksforgeeks.org/problems/perfect-sum-problem5633/1
*/

#include "bits/stdc++.h"
using namespace std;


class Solution {
	public:
	vector<vector<int>> dp;
	int mod = 1e9 + 7;
	int pre(int n, int sum, int arr[]) {
        if(n == 0 and sum != 0) return 0;
        if(sum == 0 and n == 0) return 1;
        if(dp[n][sum] != -1) return dp[n][sum];
	   // if(sum == 0) return 1;
	   // if(n < 0 or sum < 0) return 0;
	    
	    if(arr[n-1] <= sum)
	        return dp[n][sum] = pre(n-1,sum-arr[n-1],arr)%mod + 
	            pre(n-1,sum,arr)%mod;
        else return dp[n][sum] = pre(n-1,sum,arr)%mod;
	}
	int perfectSum(int arr[], int n, int sum) {
	    dp.resize(n+2 , vector<int> (sum+2,-1));
        return pre(n,sum,arr)%mod;
	}
};


class Solution {
	public:
	vector<vector<int>> dp;
	int mod = 1e9 + 7;
	int perfectSum(int arr[], int n, int sum) {
	    dp.resize(n+2 , vector<int> (sum+2,0));
	    dp[0][0] = 1;
	    
	    for(int i=1;i<=n;i++){
	        for(int j=0;j<=sum;j++){
	            if(arr[i-1] <= j)
	                dp[i][j] = dp[i-1][j-arr[i-1]]%mod +
	                    dp[i-1][j]%mod;
                else
                    dp[i][j] = dp[i-1][j]%mod;
	        }
	    }
        return dp[n][sum]%mod;
	}
};