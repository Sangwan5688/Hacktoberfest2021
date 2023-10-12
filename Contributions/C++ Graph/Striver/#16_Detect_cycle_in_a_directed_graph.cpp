/*
    TODO: Detect cycle in a directed graph
    ? https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=detect-cycle-in-a-directed-graph
*/

#include "bits/stdc++.h"
using namespace std;

//! with~ using dfsvisit
class Solution {
  public:
    bool dfs(int u, vector<int>& visit, vector<int> adj[]){
        visit[u] = 2;
        for(auto v : adj[u]){
            if(visit[v] == 0){
                if(dfs(v,visit,adj)) return true;
            }else if(visit[v] == 2) return true;
        }
        visit[u] = 1;
        return false;
    }
    bool isCyclic(int n, vector<int> adj[]) {
        vector<int> visit(n,0);
        for(int i=0;i<n;i++){
            if(visit[i] == 0){
                if(dfs(i,visit,adj)) return true;
            }
        }
        return false;
    }
};

//! dfs
class Solution {
  public:
    bool dfs(int u, vector<bool>& visit, vector<bool>& dfsvisit, 
        vector<int> adj[]){
        visit[u] = dfsvisit[u] = true;
        for(auto v : adj[u]){
            if(visit[v] == false){
                if(dfs(v,visit,dfsvisit,adj)) return true;
            }else if(visit[v] and dfsvisit[v]) return true;
        }
        dfsvisit[u] = false;
        return false;
    }
    bool isCyclic(int n, vector<int> adj[]) {
        vector<bool> visit(n,false), dfsvisit(n,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(dfs(i,visit,dfsvisit,adj)) return true;
            }
        }
        return false;
    }
};