/*
    * Permutations
    ? https://leetcode.com/problems/permutations/
*/
class Solution {
    public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> ans;
        pre(0,nums,ans);
        return ans;
    }
    void pre(int index,vector<int> &nums,vector<vector<int>> &ans){
        if(index == nums.size()){
            ans.push_back(nums);
            return;
        }
        for(int i=index;i<nums.size();i++){
            swap(nums[index],nums[i]);
            pre(index+1,nums,ans);
            swap(nums[index],nums[i]);
        }
    }
};