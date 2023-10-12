/*
    TODO: Diameter of Binary Tree
    ? https://leetcode.com/problems/diameter-of-binary-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    int mx = 0;
    int pre(TreeNode* root) {
        if(root == nullptr) return 0;
        int left = 0, right = 0;
        if(root->left) left = pre(root->left);
        if(root->right) right = pre(root->right);

        mx = max(mx, right + left);
        return 1 + max(left,right);
    }
    int diameterOfBinaryTree(TreeNode* root) {
        if(root == nullptr) return mx;
        pre(root);
        return mx;
    }
};

//! Java
class Solution {
    public int mx = 0;
    public int pre(TreeNode root) {
        if(root == null) return 0;
        int left = 0, right = 0;
        if(root.left != null) left = pre(root.left);
        if(root.right != null) right = pre(root.right);

        mx = Math.max(mx, right + left);
        return 1 + Math.max(left,right);
    }
    public int diameterOfBinaryTree(TreeNode root) {
        if(root == null) return mx;
        pre(root);
        return mx;
    }
}