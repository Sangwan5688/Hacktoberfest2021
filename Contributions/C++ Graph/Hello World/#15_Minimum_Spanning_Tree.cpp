/*
    TODO: Minimum Spanning Tree ( Prism Algorithum)
    ? https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
	public:
    int spanningTree(int n, vector<vector<int>> adj[]){
        vector<int> mset(n+1,false), key(n+1,INT_MAX);
        key[0] = 0;
        int res = 0;
        for(int cnt=0;cnt<n;cnt++){
            int u = -1;
            for(int i=0;i<n;i++){ // min heap
                if(!mset[i] and (u == -1 or key[i] < key[u]))
                    u = i;
            }
            mset[u] = true;
            res += key[u];
            for(int i =0;i < adj[u].size();i++){
                int v = adj[u][i][0], w = adj[u][i][1];
                key[v] = min(key[v], w);
            }
            // cout<<key[u]<<endl;
        }
        
        return res;
    }
};

class Solution{
	public:
    int spanningTree(int n, vector<vector<int>> adj[]){
        vector<int> mset(n+1,false), key(n+1,INT_MAX);
        key[0] = 0;
        int res = 0;
        for(int cnt=0;cnt<n;cnt++){
            int u = -1;
            for(int i=0;i<n;i++){ // min heap
                if(!mset[i] and (u == -1 or key[i] < key[u]))
                    u = i;
            }
            mset[u] = true;
            res += key[u];
            for(auto v : adj[u]){
                if(!mset[v[0]])
                    key[v[0]] = min(key[v[0]],v[1]);
            }
        }
        
        return res;
    }
};