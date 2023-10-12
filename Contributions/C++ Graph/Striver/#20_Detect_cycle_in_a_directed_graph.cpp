/*
    TODO: Detect cycle in a directed graph
    ? https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=detect-cycle-in-a-directed-graph
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    void dfs(int u, vector<bool>& visit, stack<int>& st, vector<int> adj[]){
        visit[u] = true;
        for(auto v : adj[u]){
            if(visit[v] == false){
                dfs(v,visit,st,adj);
            }
        }
        st.push(u);
    }
    bool isCyclic(int n, vector<int> adj[]) {
        stack<int> st;
        vector<int> visit(n,false), ans;
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                dfs(i,visit,st,adj);
            }
        }
        while(!st.empty()){
            ans.push_back(st.top());
            st.pop();
        }
        return false;
    }
};

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