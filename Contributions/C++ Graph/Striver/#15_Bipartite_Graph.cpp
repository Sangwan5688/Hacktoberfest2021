/*
    TODO: Bipartite Graph
    ? https://practice.geeksforgeeks.org/problems/bipartite-graph/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=bipartite-graph
*/

#include "bits/stdc++.h"
using namespace std;

//! dfs
class Solution {
public:
    bool dfs(int u, int parent, vector<bool>& visit, vector<int>& color, vector<int> adj[]) {
        visit[u] = true;
        if(parent == -1) color[u] = 0;
        
        for(auto v : adj[u]){
            if(visit[v] == false){
                color[v] = !color[u];
                if(dfs(v,u,visit,color,adj) == false) return false;
                // errror was
                // return dfs(v,u,visit,color,adj);
            }else if(color[v] != (!color[u])){
                // cout<<"AASDF"<<endl;
                // cout<<u<<" "<<v<<endl;
                // cout<<color[u]<<" "<<color[v]<<endl;
                return false;  
            } 
        }
        return true;
    }
	bool isBipartite(int n, vector<int>adj[]){
	    vector<bool> visit(n,false);
	    vector<int> color(n,-1);
	    for(int i=0;i<n;i++){
	        if(visit[i] == false){
	            if(dfs(i,-1,visit,color,adj) == false) return false;
	        }
	    }
	    return true;
	}

};

//! bfs
class Solution {
public:
    bool bfs(int s, vector<int>& color, vector<int> adj[]) {
        queue<int> q;
        color[s] = 0;
        q.push(s);
        while(!q.empty()) {
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int u = q.front();
                q.pop();
                
                for(auto v : adj[u]){
                    if(color[v] == -1){
                        color[v] = !color[u];
                        q.push(v);
                    //! }else if(color[v] == color[u]) return false;  both working
                    }else if(color[v] != (!color[u])) return false;
                }
            }
        }
        return true;
    }
	bool isBipartite(int n, vector<int>adj[]){
	    vector<int> color(n,-1);
	    for(int i=0;i<n;i++) {
	        if(color[i] == -1) {
	            if(bfs(i,color,adj) == false) return false;
	        }
	    }
	    return true;
	}
};