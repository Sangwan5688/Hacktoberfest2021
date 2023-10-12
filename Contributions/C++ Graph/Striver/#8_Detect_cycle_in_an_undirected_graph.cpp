/*
    TODO: Detect cycle in an undirected graph
    ? https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=detect-cycle-in-an-undirected-graph
*/

#include "bits/stdc++.h"
using namespace std;

//! bfs
class Solution {
  public:
    bool bfs(int s, vector<bool>& visit, vector<int> adj[]) {
        queue<pair<int,int>> q;
        q.push({s,-1});
        visit[s] = true;
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front().first, parent = q.front().second;
                q.pop();
                for(auto v : adj[u]){
                    if(visit[v] == false){
                        visit[v] = true;
                        q.push({v,u});
                    }else if(visit[v] and parent != v) return true;
                }
            }
        }
        return false;
    }
    bool isCycle(int n, vector<int> adj[]) {
        vector<bool> visit(n+1,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(bfs(i,visit,adj)) return true;;
            }
        }
        return false;
    }
};

//! dfs
class Solution {
  public:
    bool dfs(int u, int parent, vector<bool>& visit, vector<int> adj[]) {
        visit[u] = true;
        for(auto v : adj[u]){
            if(visit[v] == false){
                if(dfs(v,u,visit,adj)) return true;
            }else if(visit[v] and v != parent) return true;
        }
        return false;
    }
    bool isCycle(int n, vector<int> adj[]) {
        vector<bool> visit(n+1,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(dfs(i,-1,visit,adj)) return true;
            }
        }
        return false;
    }
};