/*
    TODO: Longest Substring Without Repeating Characters
    ? https://leetcode.com/problems/longest-substring-without-repeating-characters/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        map<char,int> mp;
        int mx = 0, prev = 0;
        for(int i=0;i<s.size();i++) {
            char ch = s[i];
            mp[ch]++;
            
            while(mp[ch] > 1 and prev < i) {
                mp[s[prev]]--;
                if(mp[s[prev]] == 0) mp.erase(s[prev]);
                prev++;
            }
            mx = max(mx, i - prev + 1);
        }
        return mx;
    }
};

//! Java
