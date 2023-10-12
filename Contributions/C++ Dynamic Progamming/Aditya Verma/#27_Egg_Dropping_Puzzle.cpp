/*
    TODO: Egg Dropping Puzzle
    ? https://practice.geeksforgeeks.org/problems/egg-dropping-puzzle-1587115620/1
*/

#include "bits/stdc++.h"
using namespace std;

//! recursive
class Solution {
public:
    int pre(int e, int f) {
        if(f == 0 or f == 1) return f;
        if(e == 1) return f;

        int mini = 1e9;

        for(int k=1;k<=f;k++){
            // break yes
            int temp = 1 + max(pre(e-1,k-1), pre(e,f-k));
            mini = min(mini,temp);
        }

        return mini;
    }
    int superEggDrop(int k, int n) {
        return pre(k,n);
    }
};

//! opt memo
class Solution {
    public:
    vector<vector<int>> dp;
    int pre(int e, int f) {
        if(f == 0 or f == 1) return f;
        if(e == 1) return f;
        if(dp[e][f] != -1) return dp[e][f];

        int mini = 1e9;

        for(int k=1;k<=f;k++){
            // break yes
            int t1 = 0, t2 = 0;
            if(dp[e-1][k-1] != -1) t1 = dp[e-1][k-1];
            else t1 = pre(e-1,k-1);
            dp[e-1][k-1] = t1;

            if(dp[e][f-k] != -1) t2 = dp[e][f-k];
            else t2 = pre(e,f-k);
            dp[e][f-k] = t2;

            int temp = 1 + max(t1,t2);
            mini = min(mini,temp);
        }

        return dp[e][f] = mini;
    }
    int eggDrop(int k, int n) 
    {
        dp.resize(k+2, vector<int> (n+2,-1));
        return pre(k,n);
    }
};