/*
    TODO: Validate Binary Search Tree
    ? https://leetcode.com/problems/validate-binary-search-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    bool pre(TreeNode* root, long mini, long maxi) {
        if(root == nullptr) return true;

        if(root->val <= mini) return false;
        if(root->val >= maxi) return false;

        return pre(root->left,mini,root->val) and pre(root->right,root->val,maxi);
    }
    bool isValidBST(TreeNode* root) {
        if(root == nullptr) return true;
        return pre(root,INT_MIN - 50ll,INT_MAX + 50ll);
    }
}; 

//! Java
class Solution {
    public boolean pre(TreeNode root, long mini, long maxi) {
        if(root == null) return true;

        // System.out.println(mini + " " + maxi);

        if(root.val <= mini) return false;
        if(root.val >= maxi) return false;

        return pre(root.left,mini,root.val) && pre(root.right,root.val,maxi);
    }
    public boolean isValidBST(TreeNode root) {
        if(root == null) return true;
        return pre(root,Long.MIN_VALUE,Long.MAX_VALUE);
    }
}