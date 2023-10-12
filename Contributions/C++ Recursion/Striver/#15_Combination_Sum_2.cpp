/*
    * Combination Sum 2
    ? https://leetcode.com/problems/combination-sum-ii/
    ! Bounded knapsack
    ! sort is important
    ! take target without refrence
    ! all the thing inside the loop must be in i $ index
    ! target += candidates[i] condition have been exclude in striver
*/
class Solution {
    public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<vector<int>> ans;
        vector<int> ds;
        sort(candidates.begin(),candidates.end());
        pre(0,candidates,target,ds,ans);
        return ans;
    }
    // in for loop use i instead index
    void pre(int index,vector<int>& candidates,int target,vector<int> &ds,
        vector<vector<int>> &ans){ // target without refrence
        if(target == 0){
            ans.push_back(ds);  
            return;
        }     
        
        for(int i=index;i<candidates.size();i++){
            if(i > index and candidates[i] == candidates[i-1]) continue;
            if(candidates[i] > target) break;
            
            ds.push_back(candidates[i]);
            target -= candidates[i];
            pre(i+1,candidates,target,ds,ans);
            ds.pop_back();
            target += candidates[i];
        }
    }
};
