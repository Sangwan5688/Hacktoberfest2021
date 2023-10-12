/*
    TODO: Number of Provinces
    ? https://leetcode.com/problems/number-of-provinces/
    ? https://practice.geeksforgeeks.org/problems/number-of-provinces/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=number_of_provinces
*/

#include "bits/stdc++.h"
using namespace std;

//! gfg dfs
class Solution {
  public:
    void dfs(int s, vector<bool>& visit, vector<int> adj[]) {
        visit[s] = true;
        for(auto v: adj[s]){
            if(visit[v] == false){
                dfs(v,visit,adj);
            }
        }
    }
    int numProvinces(vector<vector<int>> matrix, int n) {
        vector<int> adj[n];
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                if(i != j and matrix[i][j]){
                    adj[i].push_back(j);
                    adj[j].push_back(i);
                }
            }
        }
        
        // dfs
        vector<bool> visit(n+1,false);
        int cnt = 0;
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                dfs(i,visit,adj);
                cnt++;
            }
        }
        return cnt;
    }
};

//! gfg bfs
class Solution {
  public:
    void bfs(int s, vector<bool>& visit, vector<int> adj[]) {
        queue<int> q;
        q.push(s);
        visit[s] = true;
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front();
                q.pop();
                for(auto v: adj[u]){
                    if(visit[v] == false){
                        visit[v] = true;
                        q.push(v);
                    }
                }
            }
        }
    }
    int numProvinces(vector<vector<int>> matrix, int n) {
        vector<int> adj[n];
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                if(i != j and matrix[i][j]){
                    adj[i].push_back(j);
                    adj[j].push_back(i);
                }
            }
        }
        
        // bfs
        vector<bool> visit(n+1,false);
        int cnt = 0;
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                bfs(i,visit,adj);
                cnt++;
            }
        }
        return cnt;
    }
};
