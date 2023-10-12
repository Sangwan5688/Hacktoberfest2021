/*
    TODO: Recover Binary Search Tree
    ? https://leetcode.com/problems/recover-binary-search-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    TreeNode *prev = nullptr, *special = nullptr;
    vector<TreeNode*> temp;
    void inorder(TreeNode* root) {
        if(root == nullptr) return;

        if(root->left) inorder(root->left);
        if(prev != nullptr and prev->val > root->val) {
            if(temp.size() == 0){
                special = root;
                temp.push_back(prev);
            } 
            else temp.push_back(root);
        } 
        prev = root;
        if(root->right) inorder(root->right);
    }
    void recoverTree(TreeNode* root) {
        inorder(root);
        // for(auto node : temp) cout<<node->val<<endl;
        cout<<special->val<<endl;
        if(temp.size() == 1) {
            // cout<<temp[0]->val<<" "<<special->val<<endl;
            swap(temp[0]->val ,special->val);
        } else swap(temp[0]->val,temp[1]->val);
    }
};

//! Java
class Solution {
    public TreeNode prev = null, special = null;
    public List<TreeNode> temp = new ArrayList<>();
    public void inorder(TreeNode root) {
        if(root == null) return;

        if(root.left != null) inorder(root.left);
        if(prev != null && prev.val > root.val) {
            if(temp.size() == 0){
                special = root;
                temp.add(prev);
            } else temp.add(root);
        } 
        prev = root;
        if(root.right != null) inorder(root.right);
    }
    public void recoverTree(TreeNode root) {
        inorder(root);
        if(temp.size() == 1) {
            int t = temp.get(0).val;
            temp.get(0).val = special.val;
            special.val = t;
        } else {
            int t = temp.get(0).val;
            temp.get(0).val = temp.get(1).val;
            temp.get(1).val = t;
        } 
    }
}