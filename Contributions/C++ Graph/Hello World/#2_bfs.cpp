/*
    TODO: BFS of graph
    ? https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<int> bfsOfGraph(int V, vector<int> adj[]) {
        vector<int> ans;
        vector<bool> visit(V+1,false);
        queue<int> q;
        q.push(0);
        visit[0] = true;
        while(!q.empty()){
            int node = q.front();
            ans.push_back(node);
            q.pop();
            for(auto u : adj[node]){
                if(visit[u] == false){
                    visit[u] = true;
                    // ans.push_back(u);
                    q.push(u);
                }
            }
        }
        return ans;
    }
};