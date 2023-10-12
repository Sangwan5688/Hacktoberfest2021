/*
    TODO: Strongly Connected Components (Kosaraju's Algo)
    ? https://practice.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=strongly-connected-components-kosarajus-algo
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
	public:
	unordered_map<int,vector<int>> adjRev;
	void dfs(int u, vector<bool>& visit) {
	    visit[u] = true;
	    for(auto v : adjRev[u]) {
	        if(visit[v] == false) {
	            dfs(v,visit);
	        }
	    }
	}
	void dfsTopo(int u, vector<bool>& visit, stack<int>& st, 
	    vector<vector<int>>& adj) {
	    visit[u] = true;
	    for(auto v : adj[u]) {
	        if(visit[v] == false) {
	            dfsTopo(v,visit,st,adj);
	        }
	    }
	    st.push(u);
	}
	vector<int> findTopo(int n, vector<vector<int>>& adj) {
        stack<int> st;
        vector<bool> visit(n,false);
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                dfsTopo(i,visit,st,adj);
            }
        }
        vector<int> ans;
        while(!st.empty()) ans.push_back(st.top()), st.pop();
        return ans;
	}
    int kosaraju(int n, vector<vector<int>>& adj) {
        for(int i=0;i<n;i++){
            for(auto j : adj[i]){
                adjRev[j].push_back(i);
            }
        }
        vector<bool> visit(n,false);
        int cnt = 0;
        vector<int> topo = findTopo(n,adj);
        for(auto it : topo){
            if(visit[it] == false){
                dfs(it,visit);
                cnt++;
            }
        }
        return cnt;
    }
};
