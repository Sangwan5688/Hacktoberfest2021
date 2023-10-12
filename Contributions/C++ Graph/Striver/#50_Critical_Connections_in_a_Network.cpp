/*
    TODO: Critical Connections in a Network
    TODO: Bridges in Graph - Using Tarjan's Algorithm of time in and low time
    ? https://leetcode.com/problems/critical-connections-in-a-network/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<int> time,low;
    vector<vector<int>> bridges;
    unordered_map<int,vector<int>> adj;
    void dfs(int u, int parent, int lowTime, vector<bool>& visit) {
        low[u] = time[u] = lowTime;
        visit[u] = true;
        for(auto v : adj[u]) {
            if(v == parent) continue;
            if(visit[v] == false) {
                dfs(v,u,lowTime+1,visit);
                low[u] = min(low[u],low[v]);
                if(low[v] > time[u]){w
                    bridges.push_back({u,v});
                }
            } else {
                low[u] = min(low[u],low[v]);
            }
        }
    }
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        for(auto arr : connections) {
            int u = arr[0], v = arr[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        time.resize(n,1e9), low.resize(n,1e9);
        vector<bool> visit(n,false);
        dfs(0,-1,1,visit);
        return bridges;
    }
};

//! wrong code
class Solution {
public:
    vector<int> time,low;
    vector<vector<int>> ans;
    int cnt = 0;
    unordered_map<int,vector<int>> adj;
    void dfs(int u, int parent, int lowTime, vector<bool>& visit) {
        low[u] = time[u] = lowTime;
        visit[u] = true;
        for(auto v : adj[u]) {
            if(visit[v] == false) {
                dfs(v,u,lowTime+1,visit);
            } else if(visit[v] and parent != v) {
                time[u] = min(time[u],time[v]);
            } else {
                if(time[u] != time[v]){
                    cnt++;
                    ans.push_back({u,v});
                }
            }
        }
    }
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        for(auto arr : connections) {
            int u = arr[0], v = arr[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        time.resize(n,0), low.resize(n,1e9);
        vector<bool> visit(n,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                dfs(i,-1,1,visit);
            }
        }
        return ans;
    }
};