/*  
    * print all subsequence or subsets
    ? https://leetcode.com/problems/subsets/
    ? https://practice.geeksforgeeks.org/problems/string-subsequence-game5515/1
    ? https://www.codingninjas.com/codestudio/problems/print-subsequences_624391
*/
class Solution {
    public:
    void pre(int index,vector<int> &nums,vector<int> &ds,vector<vector<int>> &ans){
        if(index == nums.size()){
            ans.push_back(ds);
            return;
        }
        ds.push_back(nums[index]);
        pre(index+1,nums,ds,ans);
        
        ds.pop_back();
        pre(index+1,nums,ds,ans);
    }
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> ans;
        vector<int> ds;
        
        pre(0,nums,ds,ans);
        
        return ans;
    }
};