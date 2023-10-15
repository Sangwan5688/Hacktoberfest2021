/*
    TODO: Maximum Depth of Binary Tree
    ? https://leetcode.com/problems/maximum-depth-of-binary-tree/
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
        return 1 + max(left,right);
    }
    int maxDepth(TreeNode* root) {
        if(root == nullptr) return 0;
        return pre(root);
    }
};

//! Java
class Solution {
    public int pre(TreeNode root) {
        if(root == null) return 0;
        int left = 0, right = 0;
        if(root.left != null) left = pre(root.left);
        if(root.right != null) right = pre(root.right);
        return 1 + Math.max(left,right);
    }
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;
        return pre(root);
    }
}