/*
    TODO: Kruskal's Algorithm MST
    ? https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=minimum-spanning-tree
*/

#include "bits/stdc++.h"
using namespace std;

class Dijsktra {
    vector<int> size,parent;
public: 
    Dijsktra(int n){
        size.resize(n+1,1);
        parent.resize(n+1);
        for(int i=0;i<=n;i++) parent[i] = i;
    }
    int findUPar(int node){
        if(node == parent[node]) return node;
        else return parent[node] = findUPar(parent[node]);
    }
    void UnionBySize(int u, int v){
        int ult_u = findUPar(u);
        int ult_v = findUPar(v);
        if(ult_u == ult_v) return;
        
        if(size[ult_u] < size[ult_v]) {
            parent[ult_u] = ult_v;
            size[ult_v] += size[ult_u];
        }else {
            parent[ult_v] = ult_u;
            size[ult_u] += size[ult_v];
        }
    }
};

class Solution {
	public:
    int spanningTree(int n, vector<vector<int>> adj[]) {
        priority_queue<pair<int,pair<int,int>>, vector<pair<int,pair<int,int>>>, 
            greater<pair<int,pair<int,int>>>> pq;
        /*
            ? vector<pair<int,pair<int,int>>> arr
            ? sort(all(arr))
            ? for(auto pq : arr) {}
        */

        // wt, (u, v) 
        Dijsktra dj(n);
        
        for(int i = 0;i<n;i++){
            for(auto arr : adj[i]){
                int u = i, v = arr[0], wt = arr[1];
                pq.push({wt,{u,v}});
            }
        }
        
        int res = 0;
        while(!pq.empty()){
            int wt = pq.top().first, u = pq.top().second.first;
            int v = pq.top().second.second; 
            pq.pop();
            
            if(dj.findUPar(u) != dj.findUPar(v)){
                res += wt;
                dj.UnionBySize(u,v);
            }
        }   
        
        return res;
    }
};