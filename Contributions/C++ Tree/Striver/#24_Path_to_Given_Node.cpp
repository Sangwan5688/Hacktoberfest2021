/*
    TODO: Path to Given Node
    ? https://www.interviewbit.com/problems/path-to-given-node/
    ! Revise
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
bool pre(TreeNode* root, int node, vector<int>& res) {
    if(root == nullptr) return false;
    
    res.push_back(root->val);
    if(root->val == node) return true;    
    if(root->left and pre(root->left,node,res)) return true;
    if(root->right and pre(root->right,node,res)) return true;
    res.pop_back();
    
    return false;
}

vector<int> Solution::solve(TreeNode* A, int B) {
    vector<int> res;
    pre(A,B,res);
    return res;
}

//! Java
public class Solution {
    public boolean pre(TreeNode root, int node, ArrayList<Integer> res) {
        if(root == null) return false;
        
        res.add(root.val);
        if(root.val == node) return true;    
        if(root.left != null && pre(root.left,node,res)) return true;
        if(root.right != null && pre(root.right,node,res)) return true;
        res.remove(res.size()-1);
        
        return false;
    }
    public ArrayList<Integer> solve(TreeNode A, int B) {
        ArrayList<Integer> list = new ArrayList<>();
        pre(A,B,list);
        return list;
    }
}


//! C++ Brute
vector<int> Solution::solve(TreeNode* A, int B) {
    vector<int> ans;
    queue<pair<TreeNode*,vector<int>>> q;
    if(A == nullptr) return ans;
    q.push({A,{}});
    
    while(!q.empty()) {
        TreeNode* node = q.front().first;
        vector<int> temp = q.front().second;
        
        if(node->val == B) {
            ans = temp;
            break;
        }
        
        if(node->left) {
            temp.push_back(node->left->val);
            q.push({node->left,temp});
            temp.pop_back();
        }
        
        if(node->right) {
            temp.push_back(node->right->val);
            q.push({node->right,temp});
            temp.pop_back();
        }
    }
    
    return ans;
}
