/*
    TODO: Eventual Safe States
    ? https://practice.geeksforgeeks.org/problems/eventual-safe-states/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=eventual-safe-states
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    bool dfs(int u, vector<int>& visit, vector<int>& check, vector<int> adj[]) {
        visit[u] = 2;
        for(auto v : adj[u]){
            if(visit[v] == 0){
                if(dfs(v,visit,check,adj)) {
                    check[u] = 0; // it can be u and v or all the possible combination of these two
                    return true;
                }
            }else if(visit[v] == 2){
                check[u] = 0; // it can be u and v or all the possible combination of these two
                return true;  
            } 
        }
        check[u] = 1;
        visit[u] = 1;
        return false;
    }
    vector<int> eventualSafeNodes(int n, vector<int> adj[]) {
        vector<int> ans,visit(n,0),check(n,0);
        for(int i=0;i<n;i++){
            if(visit[i] == 0){
                dfs(i,visit,check,adj);
            }
        }
        for(int i=0;i<n;i++){
            if(check[i]) ans.push_back(i);
        }
        return ans;
    }
};
