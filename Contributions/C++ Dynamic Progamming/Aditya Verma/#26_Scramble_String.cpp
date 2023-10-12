/*
    TODO: Scramble String
    ? https://leetcode.com/problems/scramble-string/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    map<pair<string,string>,bool> dp;
    int pre(string s1, string s2) {
        if(s1 == s2) return true;
        if(s1.size() <= 1 or s2.size() <= 1) return false;
        if(dp.find({s1,s2}) != dp.end()) return dp[{s1,s2}];

        int n = s1.size();
        bool flag = false;
        for(int i=1;i<=n-1;i++) {
            // swaped
            if(pre(s1.substr(0,i),s2.substr(n-i,i)) and pre(s1.substr(i,n-i),s2.substr(0,n-i))) {
                flag = true;
                break;
            }
            // ~ swaped
            if(pre(s1.substr(0,i),s2.substr(0,i)) and pre(s1.substr(i,n-i),s2.substr(i,n-i))) {
                flag = true;
                break;
            }
        }
        return dp[{s1,s2}] = flag;
    }
    bool isScramble(string s1, string s2) {
        if(s1 == s2) return true;
        else if(s1.size() != s2.size()) return false;
        return pre(s1,s2);
    }
};