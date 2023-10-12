/*
    TODO: Flatten Binary Tree to Linked List
    ? https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
    ! right left root (traverse)
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    TreeNode* prev = nullptr;
    void flatten(TreeNode* root) {
        if(root == nullptr) return;

        flatten(root->right);
        flatten(root->left);

        root->left = nullptr;
        root->right = prev;
        prev = root;
    }
};

//MORRIS TRAVERSAL
class Solution {
    TreeNode* prev = NULL;
public:
    void flatten(TreeNode* root) {
        TreeNode* curr = root;
        while(curr != NULL) {
            if(curr->left != NULL) {
                TreeNode* prev = curr->left;
                while(prev->right != NULL){
                    prev = prev->right;
                } 
                prev->right = curr->right;
                curr->right = curr->left;
                curr->left = NULL;
            }
            curr = curr->right;
        }
    }
};

//! Java
class Solution {
    public TreeNode prev = null;
    public void flatten(TreeNode root) {
        if(root == null) return;

        flatten(root.right);
        flatten(root.left);

        root.left = null;
        root.right = prev;
        prev = root;
    }
}

class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;
        while(curr != null) {
            if(curr.left != null) {
                TreeNode prev = curr.left;
                while(prev.right != null) prev = prev.right;
                prev.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }
} 

