/*
    TODO: Vertical Order Traversal of a Binary Tree
    ? https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    map<int,map<int,vector<int>>> mp;
    void traverse(TreeNode* root) {
        queue<pair<TreeNode*,pair<int,int>>> q;
        q.push({root,{0,0}});
        int level = 0;
        while(!q.empty()) {
            int sz = q.size();
            for(int i=0;i<sz;i++) {
                TreeNode* node = q.front().first;
                int x = q.front().second.first, y = q.front().second.second;
                mp[y][x].push_back(node->val);
                q.pop();

                if(node->left) q.push({node->left,{level,y-1}});
                if(node->right) q.push({node->right,{level,y+1}});
            }

            level++;
        }
    }
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        traverse(root);
        vector<vector<int>> ans;
        for(auto [y,mp1] : mp) {
            vector<int> temp;
            for(auto [x,arr] : mp1) {
                sort(arr.begin(),arr.end());
                temp.insert(temp.end(),arr.begin(),arr.end());
            }
            ans.push_back(temp);
        }
        return ans;
    }
};

//! Java striver
class Tuple {
    TreeNode node; 
    int row;
    int col; 
    public Tuple(TreeNode _node, int _row, int _col) {
        node = _node; 
        row = _row; 
        col = _col; 
    }
}
class Solution {
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        TreeMap<Integer, TreeMap<Integer, PriorityQueue<Integer>>> map = new TreeMap<>(); 
        Queue<Tuple> q = new LinkedList<Tuple>();
        q.offer(new Tuple(root, 0, 0)); 
        while(!q.isEmpty()) {
            Tuple tuple = q.poll(); 
            TreeNode node = tuple.node; 
            int x = tuple.row; 
            int y = tuple.col; 
            
            
            if (!map.containsKey(x)) {
                map.put(x, new TreeMap<>());
            }
            if (!map.get(x).containsKey(y)) {
                map.get(x).put(y, new PriorityQueue<>());
            }
            map.get(x).get(y).offer(node.val);
            
            if(node.left != null) {
                q.offer(new Tuple(node.left, x - 1, y + 1)); 
            } 
            if(node.right != null) {
                q.offer(new Tuple(node.right, x + 1, y + 1)); 
            }
        }
        List<List<Integer>> list = new ArrayList<>();
        for (TreeMap<Integer, PriorityQueue<Integer>> ys : map.values()) {
            list.add(new ArrayList<>());
            for (PriorityQueue<Integer> nodes : ys.values()) {
                while (!nodes.isEmpty()) {
                    list.get(list.size() - 1).add(nodes.poll());
                }
            }
        }
        return list;
    }
}

//! Java Incorrect
class pii {
    public int fr,sc;
    public pii(int _x, int _y) {
        this.fr = _x;
        this.sc = _y;
    }
}

class pti {
    public TreeNode fr;
    public pii sc;
    public pti(TreeNode _node, int x, int y) {
        this.fr = _node;
        this.sc = new pii(x,y);
    }
}

class Solution {
    public TreeMap<Integer, TreeMap<Integer, PriorityQueue<Integer>>> mp = new TreeMap<>(); 
    public void traverse(TreeNode root) {
        Queue<pti> q = new LinkedList<>();
        q.offer(new pti(root,0,0));
        int level = 0;
        while(!q.isEmpty()) {
            int sz = q.size();
            for(int i=0;i<sz;i++) {
                TreeNode node = q.peek().fr;
                int x = q.peek().sc.fr, y = q.peek().sc.fr;
                // mp[y][x].push_back(node.val);
                if(!mp.containsKey(x)) mp.put(x, new TreeMap<>());
                if(!mp.get(x).containsKey(y)) mp.get(x).put(y, new PriorityQueue<>());
                mp.get(x).get(y).offer(node.val);

                q.poll();

                if(node.left != null) q.offer(new pti(node.left,level,y-1));
                if(node.right != null) q.offer(new pti(node.right,level,y+1));
            }
            level++;
        }
    }
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        traverse(root);
        List<List<Integer>> ans = new ArrayList<List<Integer>>();
        for(TreeMap<Integer, PriorityQueue<Integer>> ymp1 : mp.values()) {
            ans.add(new ArrayList<>());
            for(PriorityQueue<Integer> pq : ymp1.values()) {
                while(!pq.isEmpty()) {
                    ans.get(ans.size()-1).add(pq.poll());
                }
            }
        }
        return ans;
    }
}












