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
        int ans = 0,prev = 0,k = 0,currLen = 0;
        for(int i=0;i<s.size();i++){
            mp[s[i]]++;
            currLen = (i - prev + 1);
            if(mp.size() == currLen) ans = max(ans,(i - prev + 1));
            while(mp.size() < currLen and prev < i){
                int len = 0;
                for(auto j : mp){
                    len += j.second;
                }
                if(len == mp.size()) break;
                mp[s[prev]]--;
                if(mp[s[prev]] == 0) mp.erase(s[prev]);
                prev++;
            }
        }
        return ans;
    }
};