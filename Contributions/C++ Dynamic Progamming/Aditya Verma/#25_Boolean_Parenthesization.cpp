/*
    TODO: Palindromic Partitioning
    ? https://practice.geeksforgeeks.org/problems/palindromic-patitioning4845/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
public:     
    string s = "";
    
    map<pair<pair<int,int>,int>,int> dp;
    int pre(int i, int j, bool flag) {
        if(i >= j) {
            if(flag) return (s[i] == 'T');
            else return (s[i] == 'F');
            return 0;
        }
        if(dp.find({{i,j},flag}) != dp.end()) return dp[{{i,j},flag}];
        
        int cnt = 0;
        for(int k=i+1;k<=j-1;k+=2) {
            int tl = pre(i,k-1,1), fl = pre(i,k-1,0);
            int tr = pre(k+1,j,1), fr = pre(k+1,j,0);
            
            int temp  = 0;
            if(s[k] == '|') {
                if(flag) temp += tl*tr + tl*fr + fl*tr;
                else temp += fl*fr;
            } else if(s[k] == '&') {
                if(flag) temp += tl*tr;
                else temp += tr*fl + fr*tl + fr*fl;
            } else if(s[k] == '^') {
                if(flag) temp += tl*fr + fl*tr;
                else temp += tl*tr + fl*fr;
            }
            
            cnt += temp;
        }
        
        return dp[{{i,j},flag}] = cnt%1003;
    }
    int countWays(int n, string arr){
        s = arr;
        return pre(0,n-1,1);
    }
};