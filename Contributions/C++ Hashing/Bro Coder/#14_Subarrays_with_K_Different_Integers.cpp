/* 
    TODO: Subarrays with K Different Integers
    ? https://leetcode.com/problems/subarrays-with-k-different-integers/
 */

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int kDistinctSubarrays(vector<int> &arr, int n, int k) {
        unordered_map<int,int> mp, sz;
        int prev = 0, cnt = 0;
        for(int i=0;i<n;i++) {
            mp[arr[i]]++;

            if(mp.size() <= k) {
                cnt += (i - prev + 1);
                continue;
            }

            while(mp.size() > k) {
                mp[arr[prev]]--;
                if(mp[arr[prev]] == 0) mp.erase(arr[prev]);
                prev++;
            }

            if(mp.size() <= k) {
                cnt += (i - prev + 1);
                continue;
            }
        }
        return cnt;
    }
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        int ans1 = kDistinctSubarrays(nums, nums.size(), k);
        int ans2 = kDistinctSubarrays(nums, nums.size(), k-1);
        return ans1 - ans2;
    }
};