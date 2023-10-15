/*
    TODO: Shortest Path in Weighted undirected graph
    ? https://practice.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=shortest-path-in-weighted-undirected-graph
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<int> shortestPath(int n, int m, vector<vector<int>>& edges) {
        vector<vector<int>> adj[n+1];
        for(auto arr : edges){
            int u = arr[0], v = arr[1], wt = arr[2];
            adj[u].push_back({v,wt});
            adj[v].push_back({u,wt});
        }
        vector<int> dist(n+1,1e9), src(n+1,-1);
        set<pair<int,int>> st;
        st.insert({0,1});
        src[0] = 0;
        
        while(!st.empty()){
            int distance = st.begin()->first;
            int u = st.begin()->second;
            
            st.erase(st.begin());
            for(auto pr : adj[u]){
                int v = pr[0], wt = pr[1];
                if(distance + wt < dist[v]){
                    dist[v] = distance + wt;
                    st.insert({dist[v],v});
                    src[v] = u;
                }
            }
        }
        
        // for(auto i : dist) cout<<i<<" "; cout<<endl;
        // for(auto i : src) cout<<i<<" "; cout<<endl;
        vector<int> ans;
        int no = n;
        while(no != 1){
            ans.push_back(no);
            no = src[no];
            if(no == -1) return {-1};
        }
        ans.push_back(1);
        reverse(ans.begin(),ans.end());
        return ans;
    }
};


//! striver
class Solution {
  public:
    vector<int> shortestPath(int n, int m, vector<vector<int>>& edges) {
        vector<vector<int>> adj[n+1];
        for(auto arr : edges){
            int u = arr[0], v = arr[1], wt = arr[2];
            adj[u].push_back({v,wt});
            adj[v].push_back({u,wt});
        }
        vector<int> dist(n+1,1e9), src(n+2,-1);
        set<pair<int,int>> st;
        st.insert({0,1});
        for(int i=0;i<=n+1;i++) src[i] = i;
        
        while(!st.empty()){
            int distance = st.begin()->first;
            int u = st.begin()->second;
            
            st.erase(st.begin());
            for(auto pr : adj[u]){
                int v = pr[0], wt = pr[1];
                if(distance + wt < dist[v]){
                    dist[v] = distance + wt;
                    st.insert({dist[v],v});
                    src[v] = u;
                }
            }
        }
        
        if(dist[n] == 1e9) return {-1};
        vector<int> ans;
        while(src[n] != 1){
            ans.push_back(n);
            n = src[n];
        }
        ans.push_back(n);
        ans.push_back(1);
        reverse(ans.begin(),ans.end());
        return ans;
    }
};