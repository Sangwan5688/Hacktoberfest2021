/*
    TODO: Binary Tree Inorder Traversal
    ? https://leetcode.com/problems/binary-tree-inorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> ans;
    void pre(TreeNode* root) {
        if(root == nullptr) return;
        if(root->left) pre(root->left);
        ans.push_back(root->val);
        if(root->right) pre(root->right);
    }
    vector<int> inorderTraversal(TreeNode* root) {
        if(root == nullptr) return ans;
        pre(root);
        return ans;
    }
};

//! Java
class Solution {
    public List<Integer> list = new ArrayList<>();
    public void pre(TreeNode root) {
        if(root == null) return;
        if(root.left != null) pre(root.left);
        list.add(root.val);
        if(root.right != null) pre(root.right);
    }
    public List<Integer> inorderTraversal(TreeNode root) {
        if(root == null) return list;
        pre(root);
        return list;
    }
}