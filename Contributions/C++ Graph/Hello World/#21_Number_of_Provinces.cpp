/*
    TODO: Number of Provinces
    ? https://leetcode.com/problems/number-of-provinces/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    void dfs(int s,vector<bool> &visit,vector<int> adj[]){
        visit[s] = true;
        for(auto n : adj[s]){
            if(visit[n] == false){
                dfs(n,visit,adj);
            }
        }
    }
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<int> adj[n+1];
        for(int i=0;i<n;i++){
            for(int j=0;j<isConnected[i].size();j++){
                if(i != j and isConnected[i][j]){
                    adj[i+1].push_back(j+1);
                }
            }
        }
        vector<bool> visit(n+2,false);
        visit[0] = true;
        int res = 0;
        for(int i=0;i<n+1;i++){
            if(visit[i] == false){
                dfs(i,visit,adj);
                res++;
            }
        }
        return res;
    }
};