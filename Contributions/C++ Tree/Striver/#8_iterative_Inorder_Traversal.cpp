/*
    TODO: iterative Inorder Traversal
    ? https://leetcode.com/problems/binary-tree-inorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> ans;
        if(root == nullptr) return ans;
        stack<TreeNode*> st;
        TreeNode* node = root; //* make a global node
        while(true) {
            if(node != nullptr) { //* ~ use of while in left traverse
                st.push(node);
                node = node->left;
            } else {
                if(st.empty()) break;
                node = st.top();
                st.pop();
                ans.push_back(node->val);
                node = node->right; //* ~ if(node->right) condition is used
            }
        }        
        return ans;
    }
};

//! Java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> list = new ArrayList<>();
        if(root == null) return list;

        Stack<TreeNode> st = new Stack<>();
        TreeNode node = root;
        while(true) {
            if(node != null) {
                st.push(node);
                node = node.left;
            } else {
                if(st.isEmpty()) break;
                node = st.peek();
                st.pop();
                list.add(node.val);
                node = node.right;
            }
        }
        return list;
    }
}