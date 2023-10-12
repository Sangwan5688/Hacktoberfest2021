/* 
    TODO: Longest Consecutive Sequence
    ? https://leetcode.com/problems/longest-consecutive-sequence/description/
    ? https://practice.geeksforgeeks.org/problems/longest-consecutive-subsequence2449/1
 */

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_map<int,bool> mp;
        for(auto i : nums) mp[i] = true;
        int mx = 0;
        for(auto &[no,flag] : mp){
            if(mp.find(no-1) != mp.end()) {
                flag = false;
                continue;
            }
            int start = no+1,len = 1;

            while(mp.find(start) != mp.end()) len++, start++;

            mx = max(mx,len);                        
        }
        return mx;
    }
};

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        map<int,int> mp;
        for(auto i : nums) mp[i]++;
        int ans = 0, prev = mp.begin()->first - 1, cons = 0;
        for(auto [i,j] : mp){
            if(i == prev+1) cons++;
            else cons = 1;
            prev = i;
            ans = max(cons,ans);
        }
        return ans;
    }
};