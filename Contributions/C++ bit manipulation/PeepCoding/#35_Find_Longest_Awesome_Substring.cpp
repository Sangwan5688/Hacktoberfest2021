/*
    TODO: Find Longest Awesome Substring
    ? https://leetcode.com/problems/find-longest-awesome-substring/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int longestAwesome(string s) {
        map<int,int> mp;
        mp[0] = -1;
        int ans = 0,state = 0,n = s.size();
        for(int i=0;i<n;i++){
            int mask = (1 << (s[i] - '0'));
            state = state ^ mask;
            if(mp.find(state) != mp.end()) ans = max(ans, i - mp[state]);
            for(int index =0;index < 10;index++){
                mask = (1 << index);
                int no = state ^ mask;
                if(mp.find(no) != mp.end()) ans = max(ans, i - mp[no]);
            }

            if(mp.find(state) == mp.end()) mp[state] = i;
        }
        return ans;
    }
};