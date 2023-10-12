/*
    TODO: Maximum Width of Binary Tree
    ? https://leetcode.com/problems/maximum-width-of-binary-tree/
    ! Revise assume ndoe to be real indexing
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    typedef long long int ll;
    int widthOfBinaryTree(TreeNode* root) {
        if(root == nullptr) return 0;
        ll ans = 0;
        queue<pair<TreeNode*,ll>> q;
        q.push({root,0});

        while(!q.empty()) {
            ll sz = q.size(), start = 0, end = 0;
            for(int i=0;i<sz;i++) {
                TreeNode* node = q.front().first;
                ll index = q.front().second;
                if(i == 0) start = index;
                else if(i == sz - 1) end = index;
                index -= start;
                q.pop();
                
                if(node->left) q.push({node->left,2ll*index+1});
                if(node->right) q.push({node->right,2ll*index+2});
            }
            ans = max(ans,end - start + 1ll);
        }
        return ans;
    }
};

//! Java
class Pair {
    public TreeNode fr;
    public long sc;
    public Pair(TreeNode fr, long sc) {
        this.fr = fr;
        this.sc = sc;
    }
}

class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if(root == null) return 0;
        long ans = 0;
        Queue<Pair> q = new LinkedList<>();
        q.offer(new Pair(root,0));

        while(!q.isEmpty()) {
            long sz = q.size(), start = 0, end = 0;
            for(int i=0;i<sz;i++) {
                TreeNode node = q.peek().fr;
                long index = q.peek().sc;
                if(i == 0) start = index;
                else if(i == sz - 1) end = index;
                index -= start;
                q.poll();

                
                if(node.left != null) q.offer(new Pair(node.left,2*index+1));
                if(node.right != null) q.offer(new Pair(node.right,2*index+2));
            }
            ans = Math.max(ans,end - start + 1);
        }
        return (int)ans;
    }
}