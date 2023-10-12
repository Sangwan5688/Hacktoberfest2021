/*
    TODO: Binary Tree Level Order Traversal
    ? https://leetcode.com/problems/binary-tree-level-order-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> ans;
        if(root == nullptr) return ans;
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            int sz = q.size();
            vector<int> temp;
            for(int i=0;i<sz;i++) {
                TreeNode* node = q.front();
                temp.push_back(node->val);
                q.pop();
                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
            }
            ans.push_back(temp);
        }
        return ans;
    }
};

//! Java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> ans = new ArrayList<List<Integer>>();
        if(root == null) return ans;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while(!q.isEmpty()) {
            int sz = q.size();
            List<Integer> temp = new ArrayList<>();
            for(int i=0;i<sz;i++) {
                TreeNode node = q.peek();
                temp.add(node.val);
                q.poll();
                if(node.left != null) q.offer(node.left);
                if(node.right != null) q.offer(node.right);
            }
            ans.add(temp);
        }
        return ans;
    }
}