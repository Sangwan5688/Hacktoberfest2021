/*
    TODO: Search in a Binary Search Tree
    ? https://leetcode.com/problems/search-in-a-binary-search-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        if(root == nullptr or root->val == val) return root;

        if(val < root->val) 
            return  searchBST(root->left,val);
        else return searchBST(root->right,val);
    }
};

//! Java
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        if(root == null || root.val == val) return root;

        if(val < root.val) return  searchBST(root.left,val);
        else return searchBST(root.right,val);
    }
}