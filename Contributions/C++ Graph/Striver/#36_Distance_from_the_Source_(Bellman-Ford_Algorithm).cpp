/*
    TODO: Distance from the Source (Bellman-Ford Algorithm)
    ? https://practice.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<int> bellman_ford(int n, vector<vector<int>>& edges, int s) {
        vector<int> dist(n,100000000); 
        dist[s] = 0;
        
        for(int i=0;i<n;i++){
            for(auto arr : edges){
                int u = arr[0], v = arr[1], wt = arr[2];
                if(dist[u] + wt < dist[v]){
                    dist[v] = dist[u] + wt;
                }
            }
        }
       
        // negative cycle 
        for(auto arr : edges){
            int u = arr[0], v = arr[1], wt = arr[2];
            if(dist[u] + wt < dist[v]){
                return {-1};
            }
        }
        
        return dist;
    }
};
