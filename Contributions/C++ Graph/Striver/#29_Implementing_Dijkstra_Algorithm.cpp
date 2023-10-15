/*
    TODO: Implementing Dijkstra Algorithm
    ? https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1
    ? 3 method for implementation : priority queue, queue, set
*/

#include "bits/stdc++.h"
using namespace std;

//! set
class Solution {
	public:
    vector <int> dijkstra(int n, vector<vector<int>> adj[], int s) {
        set<pair<int,int>> st;
        // distance node
        vector<int> dist(n,INT_MAX);
        dist[s] = 0;
        st.insert({0,s});
        while(!st.empty()){
            int d = st.begin()->first, u = st.begin()->second;
            st.erase(st.begin());
            
            for(auto pr : adj[u]){
                int v = pr[0], wt = pr[1];
                if(d + wt < dist[v]){
                    if(dist[v] != INT_MAX) st.erase({dist[v],v}); // ⭐
                    dist[v] = d + wt;
                    st.insert({dist[v],v});
                }
            }
        }
        return dist;
    }
};

//! priority queue
class Solution {
	public:
    vector <int> dijkstra(int n, vector<vector<int>> adj[], int s) {
        priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>> pq;
        // dist node
        vector<int> dist(n,INT_MAX);
        dist[s] = 0;
        pq.push({s,0});
        while(!pq.empty()){
            int sz = pq.size();
            for(int i=0;i<sz;i++){
                int node = pq.top().first;
                int distance = pq.top().second;
                pq.pop();
                // cout<<node<<" "<<distance<<endl;
                
                for(auto pr : adj[node]){
                    int v = pr[0], wt = pr[1];
                    if(distance + wt < dist[v]){
                        dist[v] = distance + wt;
                        pq.push({v,dist[v]});
                    }
                }
            }
        }
        return dist;
    }
};