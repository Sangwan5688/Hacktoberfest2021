/*
    TODO: Detect cycle in a directed graph
    ? https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1
*/

#include "bits/stdc++.h"
using namespace std;

//? DFS
class Solution {
  public:
    bool dfs(int s, vector<bool>& visit, vector<bool>& dfsvisit, vector<int> adj[]){
        visit[s] = true;
        dfsvisit[s] = true;

        for(auto n : adj[s]){
            if(visit[n] == false){
                if(dfs(n,visit,dfsvisit,adj)) return true;
            }else if(visit[n] and dfsvisit[n]) return true;
        }

        dfsvisit[s] = false;
        return false;
    }
    bool isCyclic(int n, vector<int> adj[]) {
        vector<bool> visit(n+1,false), dfsvisit(n+1,false);
        bool flag = false;
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(dfs(i,visit,dfsvisit,adj)) return true;
            }
        }
        return false;
    }
};

class Solution {
  public:
    bool dfs(int s, vector<bool> &visit, vector<bool> &dfsvisit, vector<int> adj[]){
        dfsvisit[s] = visit[s] = true;
        
        for(auto n : adj[s]){
            if(visit[n] == false){
                if(dfs(n,visit,dfsvisit,adj)) return true; // imp if condition
            }else if(visit[n] and dfsvisit[n]) return true;
        }
        
        dfsvisit[s] = false;
        return false; // imp return 
    }
    bool isCyclic(int n, vector<int> adj[]) {
        vector<bool> visit(n+1,false),dfsvisit(n+1,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(dfs(i,visit,dfsvisit,adj)) return true;
            }
        }
        return false;
    }
};