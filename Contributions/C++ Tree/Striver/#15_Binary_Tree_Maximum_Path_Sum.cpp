/*
    TODO: Binary Tree Maximum Path Sum
    ? https://leetcode.com/problems/binary-tree-maximum-path-sum/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    int mx = -1e9;
    int pre(TreeNode* root) {
        if(root == nullptr) return 0;

        int left = 0, right = 0;
        if(root->left) left = pre(root->left);
        if(root->right) right = pre(root->right);

        mx = max(mx,root->val + left + right);
        mx = max(mx,root->val + left);
        mx = max(mx,root->val + right);
        mx = max(mx,root->val);

        if(max(left,right) < 0) return root->val;
        return root->val + max(left,right);
    }
    int maxPathSum(TreeNode* root) {
        pre(root);
        return mx;
    }
};

//! Java
class Solution {
    public int mx = (int)-1e9;
    public int pre(TreeNode root) {
        if(root == null) return 0;

        int left = 0, right = 0;
        if(root.left != null) left = pre(root.left);
        if(root.right != null) right = pre(root.right);

        mx = Math.max(mx,root.val + left + right);
        mx = Math.max(mx,root.val + left);
        mx = Math.max(mx,root.val + right);
        mx = Math.max(mx,root.val);

        if(Math.max(left,right) < 0) return root.val;
        return root.val + Math.max(left,right);
    }
    public int maxPathSum(TreeNode root) {
        pre(root);
        return mx;
    }
}