/*
    TODO: Find Peak Element
    ? https://leetcode.com/problems/find-peak-element/
    ! trick work for nums[mid] > next || reverse condition of else if
*/


#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int n = nums.size();
        if(nums.size() > 1) {
            if(nums[0] > nums[1]) return 0;
            if(nums[n-2] < nums[n-1]) return n-1;
        } else return 0;

        int low = 0, high = n-1;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            int prev = nums[(mid-1+n)%n], next = nums[(mid+1)%n];
            if(prev < nums[mid] and nums[mid] > next) return mid;
            else if(nums[mid] > next) high = mid-1;
            //! if(nums[mid] > next) this is vvimp
            else low = mid+1;
        }
        return low;
    }
};

//! Brute
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        if(nums.size() == 2) {
            if(nums[1] > nums[0]) return 1;
            else return 0;
        }


        int n = nums.size(), low = 0, high = n-1;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            int prev = nums[(mid-1+n)%n], next = nums[(mid+1)%n];
            if(prev < nums[mid] and nums[mid] > next) return mid;
            else if(nums[mid] > next) high = mid-1;
            else low = mid+1;
        }
        if(low < nums.size()) return low;
        else if(high >= 0) return high;
        return -1;
    }
};