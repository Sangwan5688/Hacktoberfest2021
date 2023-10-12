/*
    TODO: Delete Node in a BST
    ? https://leetcode.com/problems/delete-node-in-a-bst/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int val) {
        if(root == nullptr) return nullptr; // mistake
        if(root->val == val) return helper(root); // mistake
        TreeNode* root1 = root; // mistake
        while(root){ // true
            if(root->val > val){
                if(root->left != nullptr and root->left->val == val){
                    root->left = helper(root->left);
                    break;
                }else root = root->left;
            }else{
                if(root->right != nullptr and root->right->val == val){
                    root->right = helper(root->right);
                    break;
                }else root = root->right;
            }
        }
        return root1;
    }
    TreeNode* helper(TreeNode* root) {
        if(root->left == nullptr and root->right == nullptr) return nullptr;
        else if(root->right == nullptr) return root->left;
        else if(root->left == nullptr) return root->right;
        else {
            TreeNode *l = root->left, *r = root->right;
            root = root->right;
            while(root->left != nullptr) root = root->left;
            // cout<<root->val<<endl;
            root->left = l;
            return r;
        }
    }
};

//! Java
class Solution {
    public TreeNode helper(TreeNode head) {
        if(head.left == null && head.right == null) return null;
        else if(head.left == null) return head.right;
        else if(head.right == null) return head.left;
        else {
            TreeNode l = head.left, r = head.right;
            head = head.right;
            while(head.left != null) head = head.left;
            head.left = l;
            return r;
        }
    }
    public TreeNode deleteNode(TreeNode root, int key) {
        if(root == null) return null;
        if(root.val == key) return helper(root);

        TreeNode head = root;
        while(head != null) {
            if(key < head.val) {
                if(head.left != null && head.left.val == key) {
                    head.left = helper(head.left); // head <-> head.left
                    break;
                } else head = head.left;
            } else {
                if(head.right != null && head.right.val == key) {
                    head.right = helper(head.right); // head <-> head.right
                    break;
                } else head = head.right;
            }
        }

        return root;
    }
}