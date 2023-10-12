/*
    TODO: All Nodes Distance K in Binary Tree
    ? https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    map<TreeNode*,TreeNode*> mp;
    TreeNode* head;
    void parent(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);

        while(!q.empty()) {
            TreeNode* node = q.front();
            q.pop();

            if(node->left) {
                mp[node->left] = node;
                q.push(node->left);
            }
            if(node->right) {
                mp[node->right] = node;
                q.push(node->right);
            }
        }
    }
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        parent(root);
        vector<int> ans;
        vector<bool> visit(505,false);
        queue<pair<TreeNode*,int>> q;
        q.push({target,k});
        visit[target->val] = true;

        while(!q.empty()) {
            TreeNode* node = q.front().first;
            int dist = q.front().second;
            q.pop();

            if(dist < 0) continue;
            else if(dist == 0) ans.push_back(node->val);
            
            if(mp.find(node) != mp.end() and !visit[mp[node]->val]) 
                q.push({mp[node],dist-1}), visit[mp[node]->val] = true;
            if(node->left and !visit[node->left->val]) 
                q.push({node->left,dist-1}), visit[node->left->val] = true;
            if(node->right and !visit[node->right->val]) 
                q.push({node->right,dist-1}), visit[node->right->val] = true;
        }
        return ans;
    }
};

//! Java
class Pair {
    public TreeNode fr;
    public int sc;
    public Pair(TreeNode fr, int sc) {
        this.fr = fr;
        this.sc = sc;
    }
}
class Solution {
    public Map<TreeNode,TreeNode> mp = new HashMap<>();
    public void parent(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while(!q.isEmpty()) {
            TreeNode node = q.peek();
            q.poll();

            if(node.left != null) {
                mp.put(node.left,node);
                q.offer(node.left);
            }
            if(node.right != null) {
                mp.put(node.right,node);
                q.offer(node.right);
            }
        }
    }
    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        parent(root);
        List<Integer> ans = new ArrayList<>();
        boolean visit[] = new boolean[505];
        Arrays.fill(visit,false);
        Queue<Pair> q = new LinkedList<>();
        q.offer(new Pair(target,k));
        visit[target.val] = true;

        while(!q.isEmpty()) {
            TreeNode node = q.peek().fr;
            int dist = q.peek().sc;
            q.poll();

            if(dist < 0) continue;
            else if(dist == 0) ans.add(node.val);
            
            if(mp.containsKey(node) && !visit[mp.get(node).val]) {
                q.offer(new Pair(mp.get(node),dist-1));
                visit[mp.get(node).val] = true;
            }
            if(node.left != null && !visit[node.left.val]) {
                q.offer(new Pair(node.left,dist-1));
                visit[node.left.val] = true;
            }   
            if(node.right != null && !visit[node.right.val]) {
                q.offer(new Pair(node.right,dist-1));
                visit[node.right.val] = true;
            }
        }
        return ans;
    }
}