/*
    TODO: Diameter of Binary Tree
    ? https://leetcode.com/problems/diameter-of-binary-tree/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public: 
    int maxi = -1e9;
    int pre(TreeNode* root) {
        if(root == nullptr) return 0;

        int left = 0, right = 0;
        if(root->left) left = pre(root->left);
        if(root->right) right = pre(root->right);
        
        maxi = max(maxi,left + right);
        // cout<<root->val<<" "<<1 + left + right<<endl;
        return 1 + max(left,right);
    }
    int diameterOfBinaryTree(TreeNode* root) {
        pre(root);
        return maxi;
    }
};

//! worst time comp
class Solution {
public: 
    int maxi = -1e9;
    map<TreeNode*,int> dp;
    int pre(TreeNode* root) {
        if(root == nullptr) return 0;
        if(dp.find(root) != dp.end()) return dp[root];

        int left = 0, right = 0;
        if(dp.find(root->left) != dp.end()) left = dp[root->left];
        else {
            if(root->left) left = pre(root->left);
            dp[root->left] = left;
        }
        if(dp.find(root->right) != dp.end()) right = dp[root->right];
        else {
            if(root->right) right = pre(root->right);
            dp[root->right] = right;
        }
        
        maxi = max(maxi,left + right);
        // cout<<root->val<<" "<<1 + left + right<<endl;
        return dp[root] = 1 + max(left,right);
    }
    int diameterOfBinaryTree(TreeNode* root) {
        pre(root);
        return maxi;
    }
};