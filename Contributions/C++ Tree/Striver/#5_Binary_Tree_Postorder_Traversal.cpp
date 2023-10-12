/*
    TODO: Binary Tree Postorder Traversal
    ? https://leetcode.com/problems/binary-tree-postorder-traversal/
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
        if(root->right) pre(root->right);
        ans.push_back(root->val);
    }
    vector<int> postorderTraversal(TreeNode* root) {
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
        if(root.right != null) pre(root.right);
        list.add(root.val);
    }
    public List<Integer> postorderTraversal(TreeNode root) {
        if(root == null) return list;
        pre(root);
        return list;
    }
}