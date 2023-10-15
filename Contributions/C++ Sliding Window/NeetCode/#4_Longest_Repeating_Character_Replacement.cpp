/*
    TODO: Longest Repeating Character Replacement
     ? https://leetcode.com/problems/longest-repeating-character-replacement/
*/

#include "bits/stdc++.h"
using namespace std;

//! Naive Diff to approach - O(n)
class Solution {
public:
    int characterReplacement(string s, int k) {
        map<char,int> mp;
        int mx = 0, prev = 0, curr = 0;
        for(int i=0;i<s.size();i++) {
            mp[s[i]]++;
            curr = max(curr, mp[s[i]]);
            int total = i - prev + 1;

            if(total - curr <= k) {
                mx = max(mx, i - prev + 1);
                continue;
            }

            while(total - curr > k) {
                mp[s[prev]]--;
                if(mp[s[prev]] == 0) mp.erase(s[prev]);
                prev++;

                total = i - prev + 1; 
            }
        }
        return mx;
    }
};

//! O(26*n)
class Solution {
public:
    int characterReplacement(string s, int k) {
        map<char,int> mp;
        int mx = 0, prev = 0, curr = 0;
        for(int i=0;i<s.size();i++) {
            mp[s[i]]++;
            curr = max(curr, mp[s[i]]);
            int total = i - prev + 1;

            if(total - curr <= k) {
                mx = max(mx, i - prev + 1);
                continue;
            }

            while(total - curr > k) {
                mp[s[prev]]--;
                if(mp[s[prev]] == 0) mp.erase(s[prev]);
                prev++;

                total = i - prev + 1;
                curr = 0;
                for(auto [ch,cnt] : mp) curr = max(curr,cnt);
            }
        }
        return mx;
    }
};

//! Java