/*
    TODO: Search Insert Position
    ? https://leetcode.com/problems/search-insert-position/description/
    ? https://practice.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int low = 0, high = nums.size()-1;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            if(nums[mid] == target) return mid;
            else if(nums[mid] < target) low = mid+1;
            else high = mid-1;
        }
        return high+1;
    }
};