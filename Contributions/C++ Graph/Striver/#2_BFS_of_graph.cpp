/*
    TODO: BFS of graph
    ? https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=bfs_of_graph
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<int> bfsOfGraph(int n, vector<int> adj[]) {
        vector<int> ans;
        queue<int> q;
        vector<bool> visit(n+1,false);
        q.push(0);
        visit[0] = true; // ⭐
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front();
                q.pop();
                ans.push_back(u);
                for(auto v : adj[u]){
                    if(visit[v] == false){
                        visit[v] = true;
                        q.push(v);
                    }
                }
            }
        }
        return ans;
    }
};