/*
    TODO: Find First and Last Position of Element in Sorted Array
    ? https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> ans = {-1,-1};

        int low = 0, high = nums.size()-1;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            if(nums[mid] >= target) {
                if(nums[mid] == target) ans[0] = mid;
                high = mid-1;
            } else low = mid+1;
        }

        low = 0, high = nums.size()-1;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            if(nums[mid] <= target) {
                if(nums[mid] == target) ans[1] = mid;
                low = mid+1;
            } else high = mid-1;
        }

        return ans;
    }
};

//! Brute
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> ans = {-1,-1};

        int low = 0, high = nums.size()-1;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            cout<<low<<" "<<high<<" "<<mid<<endl;
            if(nums[mid] == target) {
                int start = mid, end = mid;

                while(start >= 0 and nums[start] == target) start--;
                ans[0] = start+1;
                while(end < nums.size() and nums[end] == target) end++;
                ans[1] = end-1;

                break;
            } else if(nums[mid] < target) low = mid+1;
            else high = mid-1;
        }

        return ans;
    }
};