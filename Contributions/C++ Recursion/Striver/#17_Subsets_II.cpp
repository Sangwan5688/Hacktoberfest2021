/*
    * Subsets II
    ? https://leetcode.com/problems/subsets-ii/
    ! in for loop making i as index
    ! we are not waiting for particular index
*/
class Solution {
    public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        vector<vector<int>> ans;
        vector<int> ds;
        sort(nums.begin(),nums.end());
        pre(0,nums,ds,ans);
        return ans;
    }
    void pre(int index,vector<int> &nums,vector<int> &ds,vector<vector<int>> &ans){
        ans.push_back(ds);
        for(int i=index;i < nums.size();i++){
            if(i != index and nums[i] == nums[i-1]) continue;
            ds.push_back(nums[i]);
            pre(i+1,nums,ds,ans);
            ds.pop_back();
        }
    }
};
