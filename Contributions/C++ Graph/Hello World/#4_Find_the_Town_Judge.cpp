/*
    TODO: Find the Town Judge
    ? https://leetcode.com/problems/find-the-town-judge/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    void bfs(vector<int> adj[], int source, vector<bool> &visit, vector<int> &vote){
        queue<int> q;
        q.push(source);

        while(!q.empty()){
            int node = q.front();
            q.pop();
            for(auto i : adj[node]){
                if(!visit[i]){
                    visit[i] = true;
                    q.push(i);
                }
                vote[i]++;
            }
        }
    }
    int findJudge(int n, vector<vector<int>>& trust) {
        if(trust.size() == 0 and n == 1) return 1;
        vector<int> adj[n+1];
        for(auto i : trust) adj[i[0]].push_back(i[1]);

        vector<bool> visit(n+5,false);
        vector<int> vote(n+5,0);
        for(int i=0;i <= n;i++){
            if(visit[i] == false){
                bfs(adj,i,visit,vote);
            }
        }

        for(int i=0;i<=n;i++){
            if(adj[i].size() == 0 and vote[i] >= n - 1) return i;
            for(auto j : adj[i]){
                cout<<j<<" ";
            }
            cout<<" vote : "<<vote[i]<<endl;
        }

        return -1;
    }
};