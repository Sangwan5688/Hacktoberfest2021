/*
    TODO: Sliding Window Maximum || Monotoinc Decreasing Queue
    ? https://leetcode.com/problems/sliding-window-maximum/
    ! O(k*(n-k))
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size(), prev = 0;
        vector<int> ans;
        deque<int> dq;
        for(int i=0;i<k;i++) {
            while(!dq.empty() and nums[i] > dq.back()) dq.pop_back();
            dq.push_back(nums[i]);
        }
        ans.push_back(dq.front());
        for(int i=k;i<n;i++) {
            if(dq.front() == nums[prev]) dq.pop_front();
            prev++;
            while(!dq.empty() and nums[i] > dq.back()) dq.pop_back();
            dq.push_back(nums[i]);
            ans.push_back(dq.front());
        }

        return ans;
    }
};

//! Brute
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        map<int,int> mp;
        vector<int> ans;
        int n = nums.size();
        for(int i=0;i<k;i++) mp[nums[i]]++;
        ans.push_back(mp.rbegin()->first);

        for(int i=k;i<n;i++) {
            mp[nums[i]]++;
            mp[nums[i-k]]--;
            if(mp[nums[i-k]] == 0) mp.erase(nums[i-k]);
            ans.push_back(mp.rbegin()->first);
        }
        return ans;
    }
};

//! Java