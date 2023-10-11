//https://leetcode.com/problems/jump-game/
//You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

//Return true if you can reach the last index, or false otherwise.

class Solution {
public:
    bool canJump(vector<int>& nums) {
        vector<bool> dp(nums.size(), false);
        dp[0] = true;
        for (int i = 1; i < nums.size(); i ++) {
            for (int j = 0; j < i; j ++) {
                if (dp[j] && j+nums[j]>=i) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[nums.size()-1];
    }
};
