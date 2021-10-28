//https://leetcode.com/problems/jump-game-ii/
//Given an array of non-negative integers nums, you are initially positioned at the first index of the array.
//Each element in the array represents your maximum jump length at that position.
//Your goal is to reach the last index in the minimum number of jumps.
//You can assume that you can always reach the last index.

class Solution {
public:
    int jump(vector<int>& nums) {
        vector<int> dp(nums.size(), 0);
        for (int i = 0; i < nums.size(); i ++) 
            dp[i] = i;
        for (int i = 1; i < nums.size(); i ++)
            for (int j = 0; j < i; j ++)
                if (j+nums[j] >= i)
                    dp[i] = min(dp[i], dp[j]+1);
        return dp[nums.size()-1];
    }
};

