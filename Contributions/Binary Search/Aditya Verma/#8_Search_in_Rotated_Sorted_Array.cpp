/*
    TODO: Search in Rotated Sorted Array
    ? https://leetcode.com/problems/search-in-rotated-sorted-array/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        int low = 0, high = n-1, ans = 0;
        while(low <= high) {
            int mid = low + ((high - low) >> 1);
            int next = nums[(mid+1)%n];
            int prev = nums[(mid-1+n)%n];
            if(prev > nums[mid] and nums[mid] < next) {
                ans = mid;
                break;
            }
            else if(nums[mid] > nums[high]) low = mid+1;
            else high = mid-1;
        }
        if(nums[ans] <= target and target <= nums.back()) {
            low = ans, high = n-1;
        } else {
            low = 0, high = 0;
            if(ans - 1 >= 0) high = ans-1;
        }
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            if(nums[mid] == target) return mid;
            else if(nums[mid] < target) low = mid+1;
            else high = mid-1;
        }
        return -1;
    }
};