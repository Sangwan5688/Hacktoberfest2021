/*
    TODO: Matrix Chain Multiplication
    ? https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1
*/

#include "bits/stdc++.h"
using namespace std;
 
//! tab
class Solution {
public:
    bool isValid(string s, int start, int end){
        while(start <= end){
            if(s[start++] != s[end--]) return false;
        } return true;
    }
    void rpartition(int index, string s, vector<string>& path, vector<vector<string>>& ans){
        if(index == s.size()){
            ans.push_back(path);
            return;
        }
        for(int i=index;i<s.size();i++){
            if(isValid(s,index,i)){
                path.push_back(s.substr(index,i-index+1));
                rpartition(i+1,s,path,ans);
                path.pop_back();
            }
        }
    }
    vector<vector<string>> partition(string s) {
        vector<vector<string>> ans;
        vector<string> temp;
        rpartition(0,s,temp,ans);
        return ans;
    }
};