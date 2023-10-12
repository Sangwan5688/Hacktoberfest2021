/*
    TODO: Lowest Common Ancestor of a Binary Tree
    ? https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(root == p or root == q or root == nullptr) return root;

        TreeNode *left = nullptr, *right = nullptr;
        if(root->left) 
            left = lowestCommonAncestor(root->left,p,q);
        if(root->right) 
            right = lowestCommonAncestor(root->right,p,q);

        if(left == nullptr) return right;
        else if(right == nullptr) return left;
        else return root;
    }
};

//! Java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root == p || root == q || root == null) return root;

        TreeNode left = null, right = null;
        if(root.left != null) left = lowestCommonAncestor(root.left,p,q);
        if(root.right != null) right = lowestCommonAncestor(root.right,p,q);

        if(left == null) return right;
        else if(right == null) return left;
        else return root;
    }
}