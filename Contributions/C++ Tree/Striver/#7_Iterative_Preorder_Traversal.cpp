/*
    TODO: Iterative Preorder Traversal
    ? https://leetcode.com/problems/binary-tree-preorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> ans;
        if(root == nullptr) return ans;

        stack<TreeNode*> st;
        st.push(root);
        while(!st.empty()) {
            TreeNode* node = st.top();
            ans.push_back(node->val);
            st.pop();

            if(node->right) st.push(node->right);
            if(node->left) st.push(node->left);

        }        
        return ans;
    }
};

//! Java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if(root == null) return ans;

        Stack<TreeNode> st = new Stack<>();
        st.push(root);
        while(!st.empty()) {
            TreeNode node = st.peek();
            ans.add(node.val);
            st.pop();

            if(node.right != null) st.push(node.right);
            if(node.left != null) st.push(node.left);

        }        
        return ans;
    }
}