/*
    TODO: Number of Ways to Arrive at Destination
    ? https://practice.geeksforgeeks.org/problems/number-of-ways-to-arrive-at-destination/1
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    typedef long long int ll;
    unordered_map<int,vector<vector<ll>>> adj;
    int finalTime = 1e9;
    int countPaths(int n, vector<vector<int>>& roads) {
        for(auto arr : roads){
            int u = arr[0], v = arr[1], time = arr[2];
            adj[u].push_back({v,time});
            adj[v].push_back({u,time});
        }
        vector<ll> ways(n,0);
        // queue<pair<int,int>> q; error
        priority_queue<pair<ll,ll>,vector<pair<ll,ll>>,greater<pair<ll,ll>>> q;
        vector<ll> distTime(n,LONG_MAX); // wrong answer becouse of long_max
        q.push({0,0});
        ways[0] = 1;
        distTime[0] = 0;
        int mod = 1e9 + 7;

        while(!q.empty()){
            ll time = q.top().first;
            ll u = q.top().second;
            q.pop();

            for(auto pr : adj[u]){
                ll v = pr[0], addTime = pr[1];
                if(time + addTime < distTime[v]){
                    distTime[v] = time + addTime;
                    q.push({distTime[v],v});
                    ways[v] = ways[u];
                }else if(time + addTime == distTime[v]) {
                    ways[v] = (ways[v] + ways[u])%mod;
                }
            }
        }

        return ways[n-1];
    }
};