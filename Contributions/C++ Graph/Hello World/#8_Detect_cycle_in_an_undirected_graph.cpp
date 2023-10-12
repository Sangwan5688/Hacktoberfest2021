/*
    TODO: Detect cycle in an undirected graph
    ? https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1
*/

#include "bits/stdc++.h"
using namespace std;

// ? DFS
class Solution {
  public:
    bool dfs(int s,int parent, vector<bool> &visit, vector<int> adj[]){
        visit[s] = true;
        for(auto n : adj[s]){
            if(visit[n] == false){
                // ! dfs(n,s,visit,adj)
                if(dfs(n,s,visit,adj)) return true; //!  galiti
            }else if(visit[n] and (n != parent)) return true;
        }
        return false;
    }
    bool isCycle(int n, vector<int> adj[]) {
        vector<bool> visit(n+1,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(dfs(i,-1,visit,adj)) return true;
            }
        }
        return false;
    }
};

// ? BFS
class Solution {
  public:
    // Function to detect cycle in an undirected graph.
    bool bfs(int s, vector<bool> &visit, vector<int> adj[]){
        visit[s] = true;
        queue<pair<int,int>> q;
        q.push({s,-1});
        // becouse at vast level the parent will be different for different node
        
        while(!q.empty()){
            int node = q.front().first;
            int parent = q.front().second;
            
            q.pop();
            for(auto n : adj[node]){
                if(visit[n] == false){
                    visit[n] = true;
                    q.push({n,node});
                }else if(visit[n] == true and n != parent){
                    // cout<<n<<" "<<parent<<" "<<node<<endl;
                    return true;
                }
            }
            // cout<<node<<" "<<parent<<endl;
            // parent = node;
        }
        return false;
    }
    bool isCycle(int n, vector<int> adj[]) {
        vector<bool> visit(n+1,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(bfs(i,visit,adj)) return true;
            }
        }
        return false;
    }
};