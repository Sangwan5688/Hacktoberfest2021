/*
    TODO: Binary Search Tree Iterator
    ? https://leetcode.com/problems/binary-search-tree-iterator/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class BSTIterator {
public:
    TreeNode* root;
    stack<TreeNode*> st;
    BSTIterator(TreeNode* root) {
        this->root = root;
        while(root) {
            st.push(root);
            root = root->left;
        }
    }
    
    int next() {
        root = st.top();
        st.pop();
        int no = root->val;
        if(root->right) {
            root = root->right;
            while(root) {
                st.push(root);
                // cout<<root->val<<endl;
                root = root->left;
            }
            // cout<<endl;
        }
        return no;
    }
    
    bool hasNext() {
        return (st.size() >= 1);
    }
};

//! Java
class BSTIterator {
    public TreeNode root = null;
    public Stack<TreeNode> st = new Stack<>();
    public BSTIterator(TreeNode root) {
        this.root = root;
        while(root != null) {
            st.push(root);
            root = root.left;
        }
    }
    public int next() {
        root = st.peek();
        st.pop();
        int no = root.val;
        if(root.right != null) {
            root = root.right;
            while(root != null) {
                st.push(root);
                root = root.left;
            }
        }
        return no;
    }
    public boolean hasNext() {
        return (st.size() >= 1);
    }
}
