/*
    TODO: Alien Dictionary
    ? https://practice.geeksforgeeks.org/problems/alien-dictionary/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=alien-dictionary
*/

#include "bits/stdc++.h"
using namespace std;

// User function Template for C++

class Solution{
    public:
    unordered_map<char,vector<char>> adj;
    string topo(int n){
        string ans = "";
        map<char,int> indegree;
        for(int i =0;i<n;i++) indegree[i + 'a'] = 0;
        for(auto j : adj){
            for(auto i : j.second){ // j.second == arr
                indegree[i]++;
            }
        }
        queue<char> q;
        map<char,int> visit;
        for(auto i : indegree){
            visit[i.first] = false; // i.first == ch
        }
        for(auto i : indegree){
            if(i.second == 0){
                q.push(i.first);
                visit[i.first] = true;
            }
        }
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                char u = q.front();
                ans.push_back(u);
                q.pop();
                for(auto v : adj[u]){
                    indegree[v]--;
                    if(indegree[v] == 0){
                        q.push(v);
                        visit[v] = true;
                    }
                }
            }
        }
        // cout<<ans<<endl;
        return ans;
    }
    string findOrder(string dict[], int n, int k) {
        for(int i=1;i<n;i++){
            // cout<<i<<endl;
            if(dict[i-1][0] != dict[i][0]) adj[dict[i-1][0]].push_back(dict[i][0]);
            else{
                int n = min(dict[i-1].size() ,dict[i].size());
                for(int j=0;j<n;j++){
                    if(dict[i-1][j] != dict[i][j]){
                        // cout<<i<<" "<<j<<endl;
                        adj[dict[i-1][j]].push_back(dict[i][j]);
                        break;
                    } 
                }
            }
        }
        // for(auto i : adj){
        //     cout<<i.first<<" :: ";
        //     for(auto j : i.second) cout<<j<<" ";
        //     cout<<endl;
        // }
        return topo(n);
    }
};