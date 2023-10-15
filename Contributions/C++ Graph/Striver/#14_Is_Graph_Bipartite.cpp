/*
    TODO: Is Graph Bipartite?
    ? https://leetcode.com/problems/is-graph-bipartite/
*/

#include "bits/stdc++.h"
using namespace std;

//* striver code modification
class Solution {
public:
    vector<bool> visit;
    char changeColor(char ch){ return (ch == 'B' ? 'G' : 'B'); }
    bool bfs(int s, vector<vector<int>>& adj) {
        int n = adj.size();
        queue<pair<pair<int,int>,char>> q;
        map<int,char> mp;

        q.push({{s,-1},'G'});
        visit[s] = true;
        mp[s] = 'G';

        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front().first.first, parent = q.front().first.second;
                char ch = q.front().second, color = changeColor(ch);
                q.pop();
                for(auto v : adj[u]){
                    if(visit[v] == false){
                        q.push({{v,u},color});
                        mp[v] = color;
                        visit[v] = true;
                    }else if(mp[v] != color){
                        // cout<<v<<" mp : "<<mp[v]<<" color : "<<color<<endl;
                        return false;
                    } 
                }
            }
        }
        
        return true;
    }
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        visit.resize(n,false);
        for(int i=0;i<n;i++) {
            if(visit[i] == false) { // ⭐
                if(bfs(i,graph) == false) return false;
            }
        }
        return true;
    }
};

// * pass with exception handling
class Solution {
public:
    vector<bool> visit;
    char changeColor(char ch){ return (ch == 'B' ? 'G' : 'B'); }
    bool bfs(int s, vector<vector<int>>& adj) {
        int n = adj.size();
        vector<bool> visited(n,false);
        queue<pair<pair<int,int>,char>> q;
        map<int,char> mp;

        q.push({{s,-1},'G'});
        visited[s] = true;
        mp[s] = 'G';

        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front().first.first, parent = q.front().first.second;
                char ch = q.front().second, color = changeColor(ch);
                q.pop();
                for(auto v : adj[u]){
                    if(visited[v] == false){
                        q.push({{v,u},color});
                        mp[v] = color;
                        visited[v] = true;
                    }else if(mp[v] != color){
                        // cout<<v<<" mp : "<<mp[v]<<" color : "<<color<<endl;
                        return false;
                    } 
                }
            }
        }
        
        for(int i=0;i<n;i++) if(visit[i] or visited[i]) visit[i] = 1;
        return true;
    }
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        visit.resize(n,false);
        for(int i=0;i<n;i++) {
            if(visit[i] == false) {
                if(bfs(i,graph)) {
                    bool flag = true;
                    for(auto i : visit) flag = flag and i;
                    if(flag) return true;
                }
            }
            // visit[i] = true;
        }
        return false;
    }
};

// ! fail 1
class Solution {
public:
    vector<bool> visit;
    char changeColor(char ch){ return (ch == 'B' ? 'G' : 'B'); }
    bool bfs(int s, vector<vector<int>>& adj) {
        int n = adj.size();
        vector<bool> visited(n,false);
        queue<pair<pair<int,int>,char>> q;
        map<int,char> mp;

        q.push({{s,-1},'G'});
        visited[s] = true;
        mp[s] = 'G';

        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front().first.first, parent = q.front().first.second;
                char ch = q.front().second, color = changeColor(ch);
                q.pop();
                for(auto v : adj[u]){
                    if(visited[v] == false){
                        q.push({{v,u},color});
                        mp[v] = color;
                        visited[v] = true;
                    }else if(mp[v] != color){
                        // cout<<v<<" mp : "<<mp[v]<<" color : "<<color<<endl;
                        return false;
                    } 
                }
            }
        }
        
        for(int i=0;i<n;i++) if(visit[i] or visited[i]) visit[i] = 1;
        return true;
    }
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        visit.resize(n,false);
        for(int i=0;i<n;i++) {
            if(visit[i] == false) {
                if(bfs(i,graph)) {
                    bool flag = true;
                    for(auto i : visit) flag = flag and i;
                    if(flag) return true;
                }
            }
            visit[i] = true;
        }
        return false;
    }
};