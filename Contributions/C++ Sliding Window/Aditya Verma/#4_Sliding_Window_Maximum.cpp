/*
    TODO: Sliding Window Maximum || Max of all subarray of size k
    ? https://leetcode.com/problems/sliding-window-maximum/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> res;
        map<int,int> window;
        for(int i=0;i<k;i++) window[nums[i]]++;
        
        auto itr = window.rbegin();
        res.push_back(itr->first);
        for(int i=k;i<nums.size();i++){
            window[nums[i]]++;
            window[nums[i-k]]--;
            if(window[nums[i-k]] == 0) window.erase(nums[i-k]);
            
            auto itr = window.rbegin();
            res.push_back(itr->first);
        }
        
        return res;
    }
};