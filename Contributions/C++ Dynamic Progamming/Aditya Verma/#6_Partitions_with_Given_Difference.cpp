/*
    TODO: Partitions with Given Difference
    ? https://practice.geeksforgeeks.org/problems/partitions-with-given-difference/1
*/

#include "bits/stdc++.h"
using namespace std;


//! knive solution
class Solution {
  public:
    int mod = 1e9 + 7;
    int countPartitions(int n, int d, vector<int>& arr) {
        int sumi = 0;
        for(auto i : arr) sumi += i;
        
        vector<vector<int>> dp(n+2, vector<int> (sumi+2, 0));
        dp[0][0] = 1;
        
        for(int i=1;i<=n;i++){
            for(int j=0;j<=sumi;j++){
                if(arr[i-1] <= j)
                    dp[i][j] = dp[i-1][j - arr[i-1]]%mod + dp[i-1][j]%mod;
                else dp[i][j] = dp[i-1][j]%mod;
            }
        }
        
        for(int i=0;i<=sumi/2;i++){
            if(d == abs((sumi - i) - i)){
                return dp[n][i]%mod;
            }
        }
        
        return 0;
    }
};

//! brute solution
class Solution {
  public:
	vector<vector<int>> dp;
	int mod = 1e9 + 7;
	int perfectSum(vector<int> arr, int n, int sum) {
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
    int countPartitions(int n, int d, vector<int>& arr) {
        int sumi = 0;
        for(auto i : arr) sumi += i;
        vector<vector<int>> dp(n+2, vector<int> (sumi+2,0));
        
        for(int j=0;j<=sumi;j++) dp[0][j] = false;
        for(int i=0;i<=n;i++) dp[i][0] = true;
        
        for(int i=1;i<=n;i++){
            for(int j=0;j<=sumi;j++){
                if(arr[i-1] <= j)
                    dp[i][j] = dp[i-1][j - arr[i-1]] or dp[i-1][j];
                else 
                    dp[i][j] = dp[i-1][j];
            }
        }
        
        int cnt = 0;
        for(int s1=0;s1 <= sumi/2;s1++){
            int s2 = sumi - s1;
            if(abs(s2 - s1) == d and dp[n][s2] and dp[n][s1]) {
                cnt += max(perfectSum(arr,n,s1),perfectSum(arr,n,s2));
            }
        }
        
        return cnt;
    }
};