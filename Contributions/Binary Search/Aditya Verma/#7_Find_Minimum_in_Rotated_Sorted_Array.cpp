/*
    TODO: Find Minimum in Rotated Sorted Array
    ? https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0, high = nums.size()-1;
        while(low <= high) {
            int mid = low + ((high - low) >> 1);
            //! next = nums[(mid+1)%n]
            //! prev = nums[(mid-1+n)%n]
            if(mid-1 >= 0 and mid + 1 < nums.size() and 
                nums[mid-1] > nums[mid] and nums[mid] < nums[mid+1]) return nums[mid];
            else if(nums[mid] > nums[high]) low = mid+1;
            else high = mid-1;
        }
        return nums[low];
    }
};