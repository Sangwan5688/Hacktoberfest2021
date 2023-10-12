/*
    * Combination Sum
    ? https://leetcode.com/problems/combination-sum/
*/
class Solution {
    public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> ans;
        vector<int> ds;
        pre(0,candidates,target,ds,ans);
        return ans;
    }
    void pre(int index,vector<int> &candidates,int &target,vector<int> &ds,vector<vector<int>> &ans){
        if(index == candidates.size()){
            if(target == 0) ans.push_back(ds);
            return;
        }
        if(candidates[index] <= target){
            ds.push_back(candidates[index]);
            target -= candidates[index];
            pre(index,candidates,target,ds,ans);

            target += candidates[index];
            ds.pop_back();   
        }
        pre(index+1,candidates,target,ds,ans);
    }
};