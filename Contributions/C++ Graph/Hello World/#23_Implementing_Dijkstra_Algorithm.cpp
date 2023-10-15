/*
    TODO: Implementing Dijkstra Algorithm
    ? https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
	public:
    vector <int> dijkstra(int n, vector<vector<int>> adj[], int s) {
        vector<int> dist(n,INT_MAX),visit(n,false);
        dist[s] = 0;
        
        for(int _ =0; _ < n; _++){
            int u = -1;
            for(int i=0;i<n;i++){
                if(!visit[i] and (u == -1 or dist[u] > dist[i]))
                    u = i;
            }
            visit[u] = true;
            // for(auto v : adj[u]){
            //     dist[v[0]] = min(dist[v[0]], dist[u] + v[1]);
            // }
            for(int i=0;i<adj[u].size();i++){
                int v = adj[u][i][0];
                int w = adj[u][i][1];
                dist[v] = min(dist[v], dist[u] + w);
            }
        }
        
        return dist;
    }
};


class Solution {
	public:
    vector <int> dijkstra(int n, vector<vector<int>> adj[], int s) {
        vector<int> dist(n,INT_MAX),visit(n,false);
        dist[s] = 0;
        
        for(int _ =0; _ < n; _++){
            int u = -1;
            for(int i=0;i<n;i++){
                if(!visit[i] and (u == -1 or dist[u] > dist[i]))
                    u = i;
            }
            visit[u] = true;
            for(auto v : adj[u]){
                dist[v[0]] = min(dist[v[0]], dist[u] + v[1]);
            }
            // for(int v=0;v<n;v++){
            //     if(visit[v] == false){
            //         dist[v] = min(dist[v], dist[u] + adj[u][v]);
            //     }
            // }
        }
        
        return dist;
    }
};
