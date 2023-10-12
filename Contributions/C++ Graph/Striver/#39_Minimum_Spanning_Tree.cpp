/*
    TODO: Minimum Spanning Tree
    ? https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=minimum-spanning-tree
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
	public:
    int spanningTree(int n, vector<vector<int>> adj[]) {
        vector<vector<int>> mst;
        vector<int> visit(n,false);
        priority_queue<pair<int,pair<int,int>>, vector<pair<int,pair<int,int>>>,
            greater<pair<int,pair<int,int>>>> pq;
        pq.push({0,{0,-1}});
        
        int res = 0;
        while(!pq.empty()){
            int wt = pq.top().first, u = pq.top().second.first;
            int parent = pq.top().second.second;
            // cout<<wt<<" "<<u<<" "<<parent<<endl;
            
            pq.pop();
            if(visit[u] == true) continue;
            visit[u] = true;
            res += wt;
            
            if(parent != -1) mst.push_back({parent,u});
            
            for(auto pr : adj[u]){
                int v = pr[0], wt = pr[1];
                pq.push({wt,{v,u}});
            }
        }
        
        return res;
    }
};