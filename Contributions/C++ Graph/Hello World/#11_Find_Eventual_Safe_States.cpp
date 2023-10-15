/*
    TODO: Find Eventual Safe States
    ? https://leetcode.com/problems/find-eventual-safe-states/
*/

#include "bits/stdc++.h"
using namespace std;

// ? DFS
class Solution {
public:
    vector<int> ans;
    bool dfs(int s, vector<bool> &visit, vector<bool> &dfsvisit, vector<bool>& present_cycle, vector<int> adj[]){
        visit[s] = dfsvisit[s] = true;

        for(auto n : adj[s]){
            if(visit[n] == false){
                if(dfs(n,visit,dfsvisit,adj)) return present_cycle[s] = true;
            }else if(visit[n] and dfsvisit[n]) return present_cycle[s] = true;
        }

        dfsvisit[s] = false;
        return false;
    }
    
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> adj[n];
        for(int i=0;i<n;i++) for(auto j : graph[i]) adj[i].push_back(j);

        vector<bool> visit(n+1,false),dfsvisit(n+1,false), present_cycle(n+1,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(dfs(i,visit,dfsvisit,present_cycle,adj)){
                    for(int j=0;j<n;j++){
                        visit[j] = visit[j] | present_cycle[j];
                    }
                }
                // if(!dfs(i,visit,dfsvisit,adj)) ans.push_back(i);
            }
        }

        return ans;
    }
};