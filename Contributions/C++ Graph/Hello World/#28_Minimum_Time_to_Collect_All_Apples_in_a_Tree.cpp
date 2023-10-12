/*
    TODO: Minimum Time to Collect All Apples in a Tree
    ? https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int dfs(int s, vector<bool>& visit, vector<bool>& hasApple, vector<int> adj[]){
        visit[s] = true;
        int cost = 0;
        for(auto n : adj[s]){
            if(visit[n] == false){
                cost += dfs(n,visit,hasApple,adj);
            }
        }
        cout<<cost<<" "<<s<<endl;
        if(hasApple[s] == true or cost != 0) return 2 + cost;
        return 0;
    }
    int minTime(int n, vector<vector<int>>& edges, vector<bool>& hasApple) {
        vector<int> adj[n];
        for(auto arr : edges){
            int a = arr[0], b = arr[1];
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
        vector<bool> visit(n,false);
        int cost = dfs(0,visit,hasApple,adj);
        return cost == 0 ? 0 : cost - 2;
    }
};

class Solution {
public:
    unordered_map<int,vector<int>> adj;
    vector<bool> visit;
    int dfs(int u, int cost, vector<bool>& hasApple){
        // if(visit[u]) return 0;
        visit[u] = true;
        int childCost = 0;
        for(auto v : adj[u]){
            if(visit[v] == false){
                childCost += dfs(v,2,hasApple);
            }
        }
        if(hasApple[u] or childCost != 0) return childCost + cost; // my error childCost + 2
        else return 0;
    }
    int minTime(int n, vector<vector<int>>& edges, vector<bool>& hasApple) {
        for(auto arr : edges){
            int a = arr[0], b = arr[1];
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
        visit.resize(n,false);
        int cost = dfs(0,0,hasApple);
        return cost;
    }
};