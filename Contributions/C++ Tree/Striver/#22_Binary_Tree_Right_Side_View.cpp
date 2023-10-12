/*
    TODO: Binary Tree Right Side View
    ? https://leetcode.com/problems/binary-tree-right-side-view/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> ans;
        if(root == nullptr) return ans;

        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            int sz = q.size(), last = 0;
            for(int i=0;i<sz;i++) {
                TreeNode* node = q.front();
                last = node->val;
                q.pop();
                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
            }
            ans.push_back(last);
        }
        return ans;
    }
};

//! Java
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if(root == null) return ans;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while(!q.isEmpty()) {
            int sz = q.size(), last = 0;
            for(int i=0;i<sz;i++) {
                TreeNode node = q.peek();
                last = node.val;

                q.poll();
                if(node.left != null) q.offer(node.left);
                if(node.right != null) q.offer(node.right);
            }
            ans.add(last);
        }
        return ans;
    }
}