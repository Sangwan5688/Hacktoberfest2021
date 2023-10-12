/*
    TODO: Cheapest Flights Within K Stops
    ? https://practice.geeksforgeeks.org/problems/cheapest-flights-within-k-stops/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=cheapest-flights-within-k-stops
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    unordered_map<int,vector<vector<int>>> adj;
    vector<int> dist;
    int ans = 1e9;
    int CheapestFLight(int n, vector<vector<int>>& flights, int src, int dst, int k)  {
        for(auto arr : flights){
            int u = arr[0], v = arr[1], wt = arr[2];
            adj[u].push_back({v,wt});
        }
        vector<bool> visit(n,false);
        dist.resize(n,1e9);
        k+=2;
        queue<pair<int,pair<int,int>>> q;
        // k u cost
        q.push({k,{src,0}});
        
        while(!q.empty()){
            int k = q.front().first;
            int u = q.front().second.first, cost = q.front().second.second;
            k--;
            q.pop();

            // cout<<u<<" "<<k<<" "<<cost<<endl;
            if(u == dst){
                ans = min(ans,cost);
                continue;
            }

            if(k == 0) continue;

            for(auto pr : adj[u]){
                int v = pr[0], wt = pr[1];
                if(cost + wt < dist[v]){
                    dist[v] = cost + wt;
                    q.push({k,{v,dist[v]}});
                }
            }
        }

        return ans == 1e9 ? -1 : ans;
    }
};