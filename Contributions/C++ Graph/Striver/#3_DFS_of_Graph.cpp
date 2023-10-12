/*
    TODO: DFS of Graph
    ? https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=dfs_of_graph
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<int> ans;
    void dfs(int s, vector<bool>& visit, vector<int> adj[]) {
        visit[s] = true;
        ans.push_back(s);
        for(auto v : adj[s]){
            if(visit[v] == false){
                dfs(v,visit,adj);
            }
        }
    }
    vector<int> dfsOfGraph(int n, vector<int> adj[]) {
        vector<bool> visit(n+1,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                dfs(i,visit,adj);
            }
        }
        return ans;
    }
};