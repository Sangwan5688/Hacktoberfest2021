/*
    TODO: Prerequisite Tasks || Course Schedule I (leetcode)
    ? https://practice.geeksforgeeks.org/problems/prerequisite-tasks/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=prerequisite-tasks
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    unordered_map<int,vector<int>> adj;
    bool dfs(int u, vector<bool>& visit, vector<bool>& dfsvisit) {
        visit[u] = dfsvisit[u] = true;
        for(auto v : adj[u]){
            if(visit[v] == false){
                if(dfs(v,visit,dfsvisit)) return true;
            }else if(visit[v] and dfsvisit[v]) return true;
        }
        dfsvisit[u] = false;
        return false;
    }
	bool isPossible(int n, vector<pair<int, int> >& query) {
	    for(auto arr : query){
            int a = arr.first, b = arr.second;
            adj[b].push_back(a);
        }
        vector<bool> visit(n,false), dfsvisit(n,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(dfs(i,visit,dfsvisit)) return false;
            }
        }
        return true;
	}
};