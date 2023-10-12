/*
    * Palindrome Partitioning
    ? https://leetcode.com/problems/palindrome-partitioning/
*/
class Solution {
    public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> ans;
        vector<string> ds;
        pre(0,s,ds,ans);
        return ans;
    }
    void pre(int index,string s,vector<string> &ds,vector<vector<string>> &ans){
        if(index == s.size()){
            ans.push_back(ds);
            return;
        }
        for(int i=index;i< s.size();i++){
            if(isValid(index,i,s)){
                ds.push_back(s.substr(index,i - index + 1));
                pre(i+1,s,ds,ans);
                ds.pop_back();
            }
        }
    }
    bool isValid(int start,int end,string s){
        while(start <= end) if(s[start++] != s[end--]) return false;
        return true;
    }
};
