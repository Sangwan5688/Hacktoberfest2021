/*
    TODO: Articulation Point
    ? https://practice.geeksforgeeks.org/problems/articulation-point-1/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=articulation-point
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    int timer = 0;
    void dfs(int u, int parent, vector<bool>& visit, vector<int>& tin, 
        vector<int>& low, vector<int>& mark, vector<int> adj[]) {
        low[u] = tin[u] = timer;
        visit[u] = true;
        timer++;
        int child = 0;
        for(auto v : adj[u]) {
            if(v == parent) continue;
            if(visit[v] == false){
                dfs(v,u,visit,tin,low,mark,adj);
                low[u] = min(low[u],low[v]);
                child++;
                if(low[v] >= tin[u] and parent != -1)
                    mark[u] = 1;
            }else low[u] = min(low[u],low[v]);
        }
        if(child > 1 and parent == -1){
            mark[u] = 1;
        }
    }
    vector<int> articulationPoints(int n, vector<int>adj[]) {
        vector<bool> visit(n,false);
        vector<int> tin(n,0), low(n,0), mark(n,0);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                dfs(i,-1,visit,tin,low,mark,adj);
            }
        }
        vector<int> ans;
        for(int i=0;i<n;i++){
            if(mark[i]){
                ans.push_back(i);
            }
        }
        if(ans.size() == 0) return {-1};
        return ans;
    }
};