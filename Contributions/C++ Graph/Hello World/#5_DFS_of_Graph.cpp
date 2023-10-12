/*
    TODO: DFS of Graph
    ? https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<int> ans;
    void pre(int source, vector<int> &visit, vector<int> adj[]){
        visit[source] = true;
        ans.push_back(source);
        for(auto u : adj[source]) if(visit[u] == false) pre(u,visit,adj);
    }
    vector<int> dfsOfGraph(int n, vector<int> adj[]) {
        vector<int> visit(n+1,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                pre(i,visit,adj);
            }
        }
        return ans;
    }
};