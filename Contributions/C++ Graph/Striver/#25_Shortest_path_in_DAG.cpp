/*
    TODO: Shortest path in Directed Acyclic Graph
    ? https://practice.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=direct-acyclic-graph
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    unordered_map<int,vector<pair<int,int>>> adj;
    void dfs(int u, stack<int>& st, vector<bool>& visit){
        visit[u] = true;
        for(auto arr : adj[u]){
            int v = arr.first;
            if(visit[v] == 0){
                dfs(v,st,visit);
            }
        }
        st.push(u);
    }
    vector<int> topoSort(int n,int m, vector<vector<int>>& edges){
        for(auto arr : edges){
            int u = arr[0], v = arr[1], w = arr[2];
            adj[u].push_back({v,w});
        }
        
        vector<int> ans;
        vector<bool> visit(n,false);
        stack<int> st;
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                dfs(i,st,visit);
            }
        }
        while(!st.empty()){
            ans.push_back(st.top());
            st.pop();
        }
        return ans;
    }
    vector<int> shortestPath(int n,int m, vector<vector<int>>& edges){
        vector<int> topo = topoSort(n,m,edges);
        vector<int> dist(n,1e9);
        dist[0] = 0;
        
        for(int i=0;i<n;i++){
            int u = topo[i];
            for(auto arr : adj[u]){
                int v = arr.first, wt = arr.second;
                if(dist[u] + wt < dist[v]){
                    dist[v] = dist[u] + wt;
                }
            }
        }
        
        for(auto &i : dist) if(i == 1e9) i = -1;
        return dist;
    }
};
