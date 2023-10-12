/* 
    TODO: Single Element in a Sorted Array
    ? https://leetcode.com/problems/single-element-in-a-sorted-array/
 */

class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int n = nums.size(), low = 0, high = n - 1;
        if(n == 1) return nums[0];
        
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            if(nums[mid] == nums[mid^1]) low = mid+1;
            else high = mid-1;
        }
        return nums[low];
    }
};
