/*
    TODO: Shortest path in Undirected Graph having unit distance
    ? https://practice.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=shortest-path-in-undirected-graph-having-unit-distance
*/

#include "bits/stdc++.h"
using namespace std;

//! optimized 
class Solution {
  public:
    unordered_map<int,vector<int>> adj;
    vector<int> shortestPath(vector<vector<int>>& edges, int n,int m, int src){
        for(auto arr : edges){
            int u = arr[0], v = arr[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        
        queue<int> q;
        vector<int> dist(n,INT_MAX);
        dist[src] = 0; 
        q.push(src);
        
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front();
                q.pop();
                
                for(auto v : adj[u]){
                    if(dist[u] + 1 < dist[v]){
                        dist[v] = dist[u] + 1;
                        q.push(v);
                    }
                }
            }
        }
        
        for(auto &i : dist){
            if(i == INT_MAX) i = -1;
        }
        
        return dist;
    }
};


//! using visit vector bool
class Solution {
  public:
    unordered_map<int,vector<int>> adj;
    vector<int> shortestPath(vector<vector<int>>& edges, int n,int m, int src){
        for(auto arr : edges){
            int u = arr[0], v = arr[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        
        queue<int> q;
        vector<int> dist(n,INT_MAX);
        vector<bool> visit(n,false);
        dist[src] = 0; 
        visit[src] = true;
        q.push(src);
        
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front();
                q.pop();
                
                for(auto v : adj[u]){
                    if(visit[v] == false){
                        q.push(v);
                        visit[v] = true;
                    }
                    if(dist[u] + 1 < dist[v]){
                        dist[v] = dist[u] + 1;
                    }
                }
            }
        }
        
        for(auto &i : dist){
            if(i == INT_MAX) i = -1;
        }
        
        return dist;
    }
};
