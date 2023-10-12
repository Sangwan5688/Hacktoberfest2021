/*
    TODO: Binary Tree Zigzag Level Order Traversal
    ? https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> ans;
        if(root == nullptr) return ans;

        int level = 0;
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
            if(level&1) reverse(temp.begin(),temp.end());
            ans.push_back(temp);
            level++;
        }

        return ans;
    }
};

//! Java
class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> ans = new ArrayList<List<Integer>>();
        if(root == null) return ans;

        int level = 0;
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

            if(level%2 == 1) Collections.reverse(temp);
            ans.add(temp);
            level++;
        }

        return ans;
    }
}