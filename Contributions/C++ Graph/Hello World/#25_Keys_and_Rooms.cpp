/*
    TODO: Keys and Rooms
    ? https://leetcode.com/problems/keys-and-rooms/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    void dfs(int s,vector<bool>& visit,vector<int> adj[]){
        visit[s] = true;
        for(auto n : adj[s]){
            if(visit[n] == false){
                dfs(n,visit,adj);
            }
        }
    }
    bool canVisitAllRooms(vector<vector<int>>& rooms) {
        int n = rooms.size();
        vector<int> adj[n];
        for(int i=0;i<n;i++){
            for(auto j : rooms[i]){
                adj[i].push_back(j);
            }
        }
        vector<bool> visit(n,false);
        dfs(0,visit,adj);
        bool ans = true;
        for(auto i : visit) ans = ans and i;
        return ans;
    }
};

class Solution {
public:
    bool canVisitAllRooms(vector<vector<int>>& rooms) {
        int n = rooms.size();
        vector<bool> visit(n,false);

        queue<int> q;
        q.push(0);
        visit[0] = true;

        while(!q.empty()){
            int u = q.front();
            q.pop();

            for(auto v : rooms[u]){
                if(visit[v] == false){
                    q.push(v);
                    visit[v] = true;
                }
            }
        }

        for(auto i : visit) if(!i) return false;
        return true;
    }
};