/*
    TODO: Binary Tree Preorder Traversal
    ? https://leetcode.com/problems/binary-tree-preorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> ans;
    void pre(TreeNode* root) {
        if(root == nullptr) return;
        ans.push_back(root->val);
        if(root->left) pre(root->left);
        if(root->right) pre(root->right);
    }
    vector<int> preorderTraversal(TreeNode* root) {
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
        list.add(root.val);
        if(root.left != null) pre(root.left);
        if(root.right != null) pre(root.right);
    }
    public List<Integer> preorderTraversal(TreeNode root) {
        if(root == null) return list;
        pre(root);
        return list;
    }
}