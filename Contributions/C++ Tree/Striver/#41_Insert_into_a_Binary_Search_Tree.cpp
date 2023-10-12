/*
    TODO: Insert into a Binary Search Tree
    ? https://leetcode.com/problems/insert-into-a-binary-search-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if(root == nullptr) return new TreeNode(val);
        if(val < root->val) {
            if(root->left) insertIntoBST(root->left,val);
            else {
                TreeNode* temp = new TreeNode(val);
                root->left = temp;
            }
        } else {
            if(root->right) insertIntoBST(root->right,val);
            else {
                TreeNode* temp = new TreeNode(val);
                root->right = temp;
            }
        }
        return root;
    }
};

//! Java
class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if(root == null) return new TreeNode(val);
        if(val < root.val) {
            if(root.left != null) insertIntoBST(root.left,val);
            else {
                TreeNode temp = new TreeNode(val);
                root.left = temp;
            }
        } else {
            if(root.right != null) insertIntoBST(root.right,val);
            else {
                TreeNode temp = new TreeNode(val);
                root.right = temp;
            }
        }
        return root;
    }
}