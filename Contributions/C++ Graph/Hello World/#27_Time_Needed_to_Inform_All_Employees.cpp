/*
    TODO: Time Needed to Inform All Employees
    ? https://leetcode.com/problems/time-needed-to-inform-all-employees/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int maxi = 0;
    void dfs(int s, int time, vector<bool>& visit, vector<int> adj[], vector<int>& informTime){
        visit[s] = true;
        time += informTime[s];
        for(auto n : adj[s]){
            if(visit[n] == false){
                dfs(n,time,visit,adj,informTime);
            }
        }
        maxi = max(maxi,time);
    }
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        vector<int> adj[n];
        for(int i=0;i<n;i++){
            if(manager[i] != -1){
                adj[manager[i]].push_back(i);
            }
        }
        vector<bool> visit(n,false);
        dfs(headID,0,visit,adj,informTime);
        return maxi;
    }
};