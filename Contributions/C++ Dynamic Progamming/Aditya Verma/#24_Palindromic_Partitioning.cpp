/*
    TODO: Palindromic Partitioning
    ? https://practice.geeksforgeeks.org/problems/palindromic-patitioning4845/1
*/

#include "bits/stdc++.h"
using namespace std;

//! memo
class Solution{
public:
    string arr = "";
    vector<vector<int>> dp;
    bool isPali(int i, int j) {
        while(i < j) if(arr[i++] != arr[j--]) return false;
        return true;
    }
    int pre(int i, int j, string s) {
        if(i >= j) return 0;
        if(isPali(i,j-1)) return 0;
        if(dp[i][j] != -1) return dp[i][j];
        
        int ans = 1e9;
        for(int k=i;k<j;k++){
            if(isPali(i,k)){
                int temp = pre(i,k+1,s) + pre(k+1,j,s) + 1;
                ans = min(ans,temp);
            }
        }
        return dp[i][j] = ans;
    }
    int palindromicPartition(string str) {
        arr = str;
        int n = str.size();
        dp.resize(n+2, vector<int> (n+2,-1));
        return pre(0,n,str);
    }
};

class Solution{
public:
    string arr = "";
    vector<vector<int>> dp;
    bool isPali(int i, int j) {
        while(i < j) if(arr[i++] != arr[j--]) return false;
        return true;
    }
    int pre(int i, int j, string s) {
        if(i >= j) return 0;
        if(isPali(i,j-1)) return 0;
        if(dp[i][j] != -1) return dp[i][j];
        
        int ans = 1e9;
        for(int k=i;k<j;k++){
            if(isPali(i,k)){
                int left = 0, right = 0;
                if(dp[i][k+1] != -1) left = dp[i][k+1];
                else left = pre(i,k+1,s);
                if(dp[k+1][j] != -1) right = dp[k+1][j];
                else right = pre(k+1,j,s);
                int temp = left + right + 1;
                ans = min(ans,temp);
            }
        }
        return dp[i][j] = ans;
    }
    int palindromicPartition(string str) {
        arr = str;
        int n = str.size();
        dp.resize(n+2, vector<int> (n+2,-1));
        return pre(0,n,str);
    }
};

//! tab
class Solution{
public:
    string arr = "";
    vector<vector<int>> dp;
    bool isPali(int i, int j) {
        while(i < j) if(arr[i++] != arr[j--]) return false;
        return true;
    }
    int pre(int i, int j, string s) {
        if(i >= j) return 0;
        if(isPali(i,j-1)) return 0;
        if(dp[i][j] != -1) return dp[i][j];
        
        int ans = 1e9;
        for(int k=i;k<j;k++){
            if(isPali(i,k)){
                int left = 0, right = 0;
                
                if(dp[i][k+1] != -1) left = dp[i][k+1];
                else left = pre(i,k+1,s);
                dp[i][k+1] = left;
                
                if(dp[k+1][j] != -1) right = dp[k+1][j];
                else right = pre(k+1,j,s);
                dp[k+1][j] = right;
                
                int temp = left + right + 1;
                ans = min(ans,temp);
            }
        }
        return dp[i][j] = ans;
    }
    int palindromicPartition(string str) {
        arr = str;
        int n = str.size();
        dp.resize(n+2, vector<int> (n+2,-1));
        return pre(0,n,str);
    }
};