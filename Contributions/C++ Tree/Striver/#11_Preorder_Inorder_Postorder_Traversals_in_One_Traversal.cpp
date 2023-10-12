/*
    TODO: Preorder Inorder Postorder Traversals in One Traversal
    ? https://leetcode.com/problems/binary-tree-preorder-traversal/
    ? https://leetcode.com/problems/binary-tree-inorder-traversal/
    ? https://leetcode.com/problems/binary-tree-postorder-traversal/
    ! FORMULA
    * if level == 1
        * preorder
        * level++
        * left
    * if level == 2
        * inorder
        * level++
        * right
    * else 
        * postorder
        * level++
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> inorder,postorder,preorder;
        if(root == nullptr) return postorder;

        stack<pair<TreeNode*,int>> st;
        st.push({root,1});
        while(!st.empty()) {
            TreeNode* node = st.top().first;
            int level = st.top().second;
            st.pop();

            if(level == 1) {
                preorder.push_back(node->val);
                level++;
                st.push({node,level});
                if(node->left) st.push({node->left,1});
            }
            else if(level == 2) {
                inorder.push_back(node->val);
                level++;
                st.push({node,level});
                if(node->right) st.push({node->right,1});
            } else {
                postorder.push_back(node->val);
                level++;
            }
        }
        return postorder;
    }
};

//! Java
class Pair {
    public TreeNode root;
    public int level;
    public Pair(TreeNode root, int level) {
        this.root = root;
        this.level = level;
    }
}

class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> in = new ArrayList<>(), pos = new ArrayList<>(), pre = new ArrayList<>();
        Stack<Pair> st = new Stack<>();

        if(root == null) return in;
        st.push(new Pair(root,1));

        while(!st.empty()) {
            TreeNode node = st.peek().root;
            int level = st.peek().level;
            st.pop();

            if(level == 1) {
                pre.add(node.val);
                level++;
                st.push(new Pair(node,level));
                if(node.left != null) st.push(new Pair(node.left,1));
            } else if(level == 2) {
                in.add(node.val);
                level++;
                st.push(new Pair(node,level));
                if(node.right != null) st.push(new Pair(node.right,1));
            } else {
                pos.add(node.val);
                level++;
            }
        }

        return in;
    }
}