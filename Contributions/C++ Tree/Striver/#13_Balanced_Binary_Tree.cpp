/*
    TODO: Balanced Binary Tree
    ? https://leetcode.com/problems/balanced-binary-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    int pre(TreeNode* root) {
        if(root == nullptr) return 0;
        int left = 0, right = 0;
        if(root->left) left = pre(root->left);
        if(root->right) right = pre(root->right);

        // cout<<root->val<<" "<<left<<" "<<right<<endl;
        if(left == -1 or right == -1) return -1;
        else if(abs(left - right) <= 1) return 1 + max(left,right);
        else return -1;
    }
    bool isBalanced(TreeNode* root) {
        if(root == nullptr) return true;
        // cout<<pre(root)<<endl;
        return (pre(root) != -1);
    }
};

//! Java
class Solution {
    public int pre(TreeNode root) {
        if(root == null) return 0;
        int left = 0, right = 0;
        if(root.left != null) left = pre(root.left);
        if(root.right != null) right = pre(root.right);

        if(left == -1 || right == -1) return -1;
        else if(Math.abs(left - right) <= 1) return 1 + Math.max(left,right);
        else return -1;
    }
    public boolean isBalanced(TreeNode root) {
        if(root == null) return true;
        return (pre(root) != -1);
    }
}