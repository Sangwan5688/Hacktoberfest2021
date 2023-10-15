/*
    TODO: Count Complete Tree Nodes
    ? https://leetcode.com/problems/count-complete-tree-nodes/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    int countNodes(TreeNode* root) {
        int cnt = 0;
        if(root == nullptr) return cnt;
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            int sz = q.size();
            for(int i=0;i<sz;i++) {
                TreeNode* node = q.front();
                cnt++;
                q.pop();
                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
            }
        }
        return cnt;
    }
};

//! Java
class Solution {
    public int countNodes(TreeNode root) {
        int cnt = 0;
        if(root == null) return cnt;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while(!q.isEmpty()) {
            int sz = q.size();
            for(int i=0;i<sz;i++) {
                TreeNode node = q.peek();
                cnt++;
                q.poll();
                if(node.left != null) q.offer(node.left);
                if(node.right != null) q.offer(node.right);
            }
        }
        return cnt;
    }
}