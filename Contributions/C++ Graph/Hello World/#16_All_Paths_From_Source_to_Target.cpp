/*
    TODO: All Paths From Source to Target
    ? https://leetcode.com/problems/all-paths-from-source-to-target/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<vector<int>> ans;
    int n = 0;

    void dfs(int s, vector<bool>& visit, vector<int>& temp, vector<int> adj[]){
        temp.push_back(s);
        if(s == n-1)
            ans.push_back(temp);
        for(auto n : adj[s]){
            dfs(n,visit,temp,adj);
        }
        temp.pop_back();
    }
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        n = graph.size();
        vector<int> adj[n],temp;
        for(int i=0;i<n;i++){
            for(auto j : graph[i]){
                adj[i].push_back(j);
            }
        }
        vector<bool> visit(n+1,false);

        dfs(0,visit,temp,adj);

        return ans;
    }
};


class Solution {
public:
    vector<vector<int>> ans;
    int n = 0;
    void dfs(int s, vector<int>& temp, vector<int> adj[]){
        temp.push_back(s);
        if(s == n-1)
            ans.push_back(temp);
        for(auto n : adj[s]){
            dfs(n,temp,adj);
        }
        temp.pop_back();
    }
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        n = graph.size();
        vector<int> adj[n],temp;
        for(int i=0;i<n;i++){
            for(auto j : graph[i]){
                adj[i].push_back(j);
            }
        }
        dfs(0,temp,adj);
        return ans;
    }
};