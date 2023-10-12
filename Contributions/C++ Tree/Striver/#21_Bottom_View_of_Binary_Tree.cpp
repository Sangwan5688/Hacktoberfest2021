/*
    TODO: Bottom View of Binary Tree
    ? https://practice.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
  public:
    map <int,int> mp;
    void traverse(Node* root) {
        queue<pair<Node*,int>> q;
        q.push({root,0});

        while(!q.empty()) {
            int sz = q.size();
            for(int i=0;i<sz;i++) {
                Node* node = q.front().first;
                int x = q.front().second;
                mp[x] = node->data;
                
                q.pop();

                if(node->left) q.push({node->left,x-1});
                if(node->right) q.push({node->right,x+1});
            }
        }
    }
    vector <int> bottomView(Node *root) {
        traverse(root);
        vector<int> ans;
        for(auto i : mp) ans.push_back(i.second);
        return ans;
    }
};

//! Java 
class Pair {
    public Node fr;
    public int sc;
    public Pair(Node node, int x) {
        this.fr = node;
        this.sc = x;
    }
}

class Solution {
    public ArrayList <Integer> bottomView(Node root) {
        TreeMap<Integer,Integer> mp = new TreeMap<>();
        Queue<Pair> q = new LinkedList<>();
        q.offer(new Pair(root,0));

        while(!q.isEmpty()) {
            int sz = q.size();
            for(int i=0;i<sz;i++) {
                Node node = q.peek().fr;
                int x = q.peek().sc;
                mp.put(x,node.data);
                
                q.poll();

                if(node.left != null) q.offer(new Pair(node.left,x-1));
                if(node.right != null) q.offer(new Pair(node.right,x+1));
            }
        }
        
        ArrayList<Integer> ans = new ArrayList<>();
        for(Map.Entry i : mp.entrySet()) ans.add((int)i.getValue());
        return ans;
    }
}