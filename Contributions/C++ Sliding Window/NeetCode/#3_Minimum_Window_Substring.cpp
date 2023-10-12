/*
    TODO: Minimum Window Substring
    ? https://leetcode.com/problems/minimum-window-substring/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        map<char,int> curr, target;
        for(auto ch : t) target[ch]++;
        int have = 0, need = target.size(), n = s.size();
        int start = 0, end = 0, mx = 1e9, prev = 0, flag = false;

        for(int i=0;i<n;i++) {
            curr[s[i]]++;
            if(target.find(s[i]) != target.end() and curr[s[i]] == target[s[i]]) have++;

            // cout<<i<<" : "<<s.substr(prev, i - prev + 1)<<endl;
            while(have == need and prev <= i) { 
                flag = true;
                if(i - prev + 1 < mx) {
                    mx = i - prev + 1;
                    start = prev, end = i;
                }
                curr[s[prev]]--;
                if(target.find(s[prev]) != target.end() and 
                    curr[s[prev]] < target[s[prev]]) have--;
                if(curr[s[prev]] == 0) curr.erase(s[prev]);
                prev++;
            }
            // cout<<s.substr(prev, i - prev + 1)<<endl;
        }
        // "ADOBECODEBANC"
        if(!flag) return "";
        return s.substr(start, end - start + 1);
    }
};

//! Java