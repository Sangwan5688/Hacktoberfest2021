/*
    TODO: Morris Traversal Preorder Traversal
    ? https://leetcode.com/problems/binary-tree-preorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> preorder;
        TreeNode* curr = root;
        while(curr != nullptr) {
            if(curr->left == nullptr) {
                preorder.push_back(curr->val);
                curr = curr->right;
            } else {
                TreeNode* prev = curr->left;
                while(prev->right and prev->right != curr) 
                    prev = prev->right;
                
                if(prev->right == nullptr) {
                    prev->right = curr;
                    preorder.push_back(curr->val);
                    curr = curr->left;
                } else {
                    prev->right = nullptr;
                    curr = curr->right;
                }
            }
        }
        return preorder;
    }
};

//! Java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> preorder = new ArrayList<>();
        if(root == null) return preorder;

        TreeNode curr = root;
        while(curr != null) {
            if(curr.left == null) {
                preorder.add(curr.val);
                curr = curr.right;
            } else {
                TreeNode prev = curr.left;
                while(prev.right != null && prev.right != curr) 
                    prev = prev.right;

                if(prev.right == null) {
                    prev.right = curr;
                    preorder.add(curr.val);
                    curr = curr.left;
                } else {
                    prev.right = null;
                    curr = curr.right;
                }
            }
        }
        return preorder;
    }
}