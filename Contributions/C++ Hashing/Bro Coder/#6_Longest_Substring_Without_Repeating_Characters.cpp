/* 
    TODO: Length of the longest substring
    ? https://leetcode.com/problems/longest-substring-without-repeating-characters/
    ? https://practice.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1
    ? https://www.interviewbit.com/problems/longest-substring-without-repeat/
 */

#include "bits/stdc++.h"
using namespace std;

//! gfg
class Solution{
    public:
    int longestUniqueSubsttr(string s){
        vector<int> mp(256,-1);
        int n = s.size(), prev = 0, mx = 0;
        for(int i=0;i<n;i++) {
            if(mp[s[i]] == -1) mp[s[i]] = i;
            else {
                mx = max(mx, i - prev);
                while(s[prev] != s[i] and prev <= i) mp[s[prev]] = -1, prev++;
                prev++;
                mp[s[i]] = i;
            }
        }
        mx = max(mx, n - prev);
        return mx;
    } 
};

//! leetcode, interviewbit but tle in gfg
class Solution{
    public:
    int longestUniqueSubsttr(string s){
        unordered_map<char,int> mp;
        int n = s.size(), prev = 0, mx = 0;
        for(int i=0;i<n;i++) {
            mp[s[i]]++;
            if(mp.size() == i - prev + 1) mx = max(mx, i - prev + 1);

            if(mp.size() < i - prev + 1) {
                prev = i;
                mp.clear();
                mp[s[i]]++;
            }
        }
        return mx;
    }
};