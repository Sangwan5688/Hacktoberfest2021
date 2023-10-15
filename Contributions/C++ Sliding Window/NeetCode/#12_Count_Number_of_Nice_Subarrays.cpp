/*
    TODO: Count Number of Nice Subarrays
    ! if # of subarrays  (concept) -> # of subarray with sum k
    ? https://leetcode.com/problems/count-number-of-nice-subarrays/
    ? https://leetcode.com/problems/binary-subarrays-with-sum/description/
    ? https://www.youtube.com/watch?v=atUJS7ArOY0&ab_channel=AdityaRajiv
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int numberOfSubarrays(vector<int>& nums, int k) {
        for(auto &i : nums) if(i&1) i = 1; else i = 0;
        map<int,int> mp, freq;
        mp[0] = 1;
        freq[0] = 1;
        int sumi = 0, cnt = 0;
        for(int i=0;i<nums.size();i++) {
            sumi += nums[i];
            if(mp.find(sumi - k) != mp.end()) {
                cnt+=freq[sumi - k];
            }
            freq[sumi]++;
            mp[sumi]++;
        }
        return cnt;
    }
};

//! Java