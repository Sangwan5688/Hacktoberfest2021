/*
    TODO: Course Schedule || Course Schedule II (leetcode)
    ? https://practice.geeksforgeeks.org/problems/prerequisite-tasks/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=prerequisite-tasks
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<int> findOrder(int n, int m, vector<vector<int>> query) {
        vector<int> adj[n],indegree(n,0),ans;
        for(auto arr : query){
            int a = arr[0], b = arr[1];
            adj[b].push_back(a);
        }
        queue<int> q;
        vector<bool> visit(n,false);
        for(int i=0;i<n;i++){
            for(auto j : adj[i]){
                indegree[j]++;
            }
        }
        for(int i=0;i<n;i++){
            if(indegree[i] == 0){
                q.push(i);
                visit[i] = true;
            }
        }
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front();
                ans.push_back(u);
                q.pop();
                for(auto j : adj[u]){
                    indegree[j]--;
                    if(indegree[j] == 0) 
                        q.push(j), visit[j] = true;
                }
            }
        }
        for(auto i : visit) if(!i) return {};
        return ans;
    }
};