/*
    TODO: Iterative Postorder Traversal using 1 Stack
    ? https://leetcode.com/problems/binary-tree-postorder-traversal/
    ! I know code was some else but i had changed according to my comfort
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> ans;
        if(root == nullptr) return ans;
        
        stack<TreeNode*> st1, st2;
        st1.push(root);
        while(!st1.empty()) {
            TreeNode* node = st1.top();
            st1.pop();
            ans.push_back(node->val);
            if(node->left) st1.push(node->left);
            if(node->right) st1.push(node->right);
        }
        reverse(ans.begin(),ans.end());
        return ans;
    }
}; 

//! Java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> list = new ArrayList<>();
        if(root == null) return list;

        Stack<TreeNode> st1 = new Stack<>(), st2 = new Stack<>();
        st1.push(root);
        while(!st1.empty()) {
            TreeNode node = st1.peek();
            st1.pop();
            list.add(node.val);
            if(node.left != null) st1.push(node.left);
            if(node.right != null) st1.push(node.right);
        }
        Collections.reverse(list);
        return list;
    }
}