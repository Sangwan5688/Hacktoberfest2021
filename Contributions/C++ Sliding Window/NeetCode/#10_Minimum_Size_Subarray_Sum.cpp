/*
    TODO: Permutation in String
    ? https://leetcode.com/problems/permutation-in-string/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int sumi = 0, prev = 0, n = nums.size(), ans = 1e9;
        for(int i=0;i<n;i++) {
            sumi += nums[i];
            if(sumi < target) continue;

            if(sumi >= target) ans = min(ans, i - prev + 1);
            while(sumi > target and prev < i) {
                if(sumi >= target) ans = min(ans, i - prev + 1);
                sumi -= nums[prev];
                prev++;
            }
            if(sumi >= target) ans = min(ans, i - prev + 1);
        }
        return ans == 1e9 ? 0 : ans;
    }
};

//! Java