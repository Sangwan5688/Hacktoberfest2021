/*
    TODO: Morris Traversal Inorder Traversal
    ? https://leetcode.com/problems/binary-tree-inorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> inorder;
        TreeNode* curr = root;
        while(curr != nullptr) {
            if(curr->left == nullptr) {
                inorder.push_back(curr->val);
                curr = curr->right;
            } else {
                TreeNode* prev = curr->left;
                while(prev->right and prev->right != curr) 
                    prev = prev->right;
                if(prev->right == nullptr) {
                    prev->right = curr;
                    curr = curr->left;
                } else {
                    prev->right = nullptr;
                    inorder.push_back(curr->val);
                    curr = curr->right;
                }
            }
        }
        return inorder;
    }
};

//! Java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        if(root == null) return inorder;

        TreeNode curr = root;
        while(curr != null) {
            if(curr.left == null) {
                inorder.add(curr.val);
                curr = curr.right;
            } else {
                TreeNode prev = curr.left;
                while(prev.right != null && prev.right != curr) 
                    prev = prev.right;

                if(prev.right == null) {
                    prev.right = curr;
                    curr = curr.left;
                } else {
                    prev.right = null;
                    inorder.add(curr.val);
                    curr = curr.right;
                }
            }
        }
        return inorder;
    }
}