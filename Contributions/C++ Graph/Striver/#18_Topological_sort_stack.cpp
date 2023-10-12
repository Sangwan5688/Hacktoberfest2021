/*
    TODO: Topological sort
    ? https://practice.geeksforgeeks.org/problems/topological-sort/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=topological-sort
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
	public:
    void dfs(int u, vector<bool>& visit, stack<int>& st, vector<int> adj[]) {
        visit[u] = true;
        for(auto v : adj[u]){
            if(visit[v] == false){
                dfs(v,visit,st,adj);
            }
        }
        st.push(u);
    }
	vector<int> topoSort(int n, vector<int> adj[]){
	    stack<int> st;
	    vector<bool> visit(n,false);
	    for(int i=0;i<n;i++){
	        if(visit[i] == false){
	            dfs(i,visit,st,adj);
	        }
	    }
	    vector<int> ans;
	    while(!st.empty()) ans.push_back(st.top()), st.pop();
	    return ans;
	}
};