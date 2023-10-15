/*
    TODO: Shortest path in Directed Acyclic Graph
    ? https://practice.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1
*/

#include "bits/stdc++.h"
using namespace std;

//? KNIVE
// User function Template for C++
class Solution {
  public:
     vector<int> shortestPath(int n,int m, vector<vector<int>>& edges){
        vector<int> ans(n,0), adj[n];
        map<pair<int,int>,int> mp;
        for(int i=0;i<edges.size();i++){
            int a = edges[i][0], b = edges[i][1], dist = edges[i][2];
            adj[a].push_back(b);
            mp[{a,b}] = dist;
        }
        
        vector<bool> visit(n,false);
        queue<int> q;
        q.push(0);
        visit[0] = true;
        while(!q.empty()){
            int node = q.front();
            q.pop();
            for(auto n : adj[node]){
                if(visit[n] == false){
                    visit[n] = true;
                    ans[n] = ans[node] + mp[{node,n}];
                    q.push(n);
                }else{
                    ans[n] = min(ans[n],ans[node] + mp[{node,n}]);
                }
            }
        }
        
        for(int i=0;i<n;i++){
            if(!visit[i]) ans[i] = -1;
        }
        
        return ans;
    }
};

//? BRUTE
// User function Template for C++
class Solution {
  public:
    void bfs(int s, vector<bool> &visit, vector<int> adj[], map<pair<int,int>,int> mp, vector<int> &ans){
        queue<int> q;
        q.push(s);
        visit[s] = true;
        while(!q.empty()){
            int node = q.front();
            q.pop();
            for(auto n : adj[node]){
                if(visit[n] == false){
                    visit[n] = true;
                    ans[n] = ans[node] + mp[{node,n}];
                    q.push(n);
                }else{
                    ans[n] = min(ans[n],ans[node] + mp[{node,n}]);
                }
            }
        }
    }
    
    vector<int> shortestPath(int n,int m, vector<vector<int>>& edges){
        vector<int> ans(n,0), adj[n];
        map<pair<int,int>,int> mp;
        for(int i=0;i<edges.size();i++){
            int a = edges[i][0], b = edges[i][1], dist = edges[i][2];
            adj[a].push_back(b);
            mp[{a,b}] = dist;
        }
        
        vector<bool> visit(n,false);
        
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                bfs(i,visit,adj,mp,ans);
                break;
            }
        }
        
        for(int i=0;i<visit.size();i++){
            if(!visit[i]){
                ans[i] = -1;
            }
        }
        
        return ans;
    }
};
