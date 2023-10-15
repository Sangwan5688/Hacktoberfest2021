/*
    TODO: Find if Path Exists in Graph
    ? https://leetcode.com/problems/find-if-path-exists-in-graph/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {
        // if(edges.size() == 0) return true;
        vector<int> adj[n+1];
        for(auto i : edges) adj[i[0]].push_back(i[1]), adj[i[1]].push_back(i[0]);

        queue<int> q;
        vector<bool> visit(n+1,false);
        q.push(source);
        visit[source] = true;
        while(!q.empty()){
            int u = q.front();
            q.pop();
            if(u == destination) return true;
            for(auto i : adj[u]){
                if(visit[i] == false){
                    visit[i] = true;
                    q.push(i);
                }
            }
        }

        return false;
    }
};