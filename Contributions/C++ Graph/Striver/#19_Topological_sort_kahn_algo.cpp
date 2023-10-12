/*
    TODO: Topological sort kahn
    ? https://practice.geeksforgeeks.org/problems/topological-sort/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=topological-sort
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
	public:
	vector<int> topoSort(int n, vector<int> adj[]){
	    queue<int> q;
	    vector<bool> visit(n,false);
	    vector<int> indegree(n,0),ans;
	    
	    for(int i=0;i<n;i++){
	        for(auto v : adj[i]){
	            indegree[v]++;
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
	            for(auto v : adj[u]){
	                if(visit[v] == false){
	                    indegree[v]--;
    	                if(indegree[v] == 0){
    	                    q.push(v);
    	                }   
	                }
	            }
	        }
	    }
	    
	    return ans;
	}
};