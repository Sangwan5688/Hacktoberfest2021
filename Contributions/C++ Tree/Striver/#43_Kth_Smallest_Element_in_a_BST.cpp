/*
    TODO: Kth Smallest Element in a BST
    ? https://leetcode.com/problems/kth-smallest-element-in-a-bst/
    ! Inorder of BST is sorted
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> inorder;
    void morish(TreeNode* root) {
        TreeNode* curr = root;
        while(curr != nullptr) {
            if(curr->left == nullptr) {
                inorder.push_back(curr->val);
                curr = curr->right;
            } else {
                TreeNode *prev = curr->left;
                while(prev->right != nullptr and prev->right != curr) 
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
    }
    int kthSmallest(TreeNode* root, int k) {
        morish(root);
        return inorder[k-1];
    }
};

//! Java
class Solution {
    public ArrayList<Integer> inorder = new ArrayList<>();
    public void morish(TreeNode root) {
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
    }
    public int kthSmallest(TreeNode root, int k) {
        morish(root);
        return inorder.get(k-1);
    }
}
