/*
    TODO: Lowest Common Ancestor of a Binary Search Tree
    ? https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(root == nullptr or root == q or root == p) return root;

        TreeNode *left = nullptr, *right = nullptr;
        if(root->left) left = lowestCommonAncestor(root->left,p,q);
        if(root->right) right = lowestCommonAncestor(root->right,p,q);

        if(left == nullptr) return right;
        else if(right == nullptr) return left;
        return root;
    }
};

//! Java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root == null || root == q || root == p) return root;

        TreeNode left = null, right = null;
        if(root.left != null) left = lowestCommonAncestor(root.left,p,q);
        if(root.right != null) right = lowestCommonAncestor(root.right,p,q);

        if(left == null) return right;
        else if(right == null) return left;
        return root;
    }
}