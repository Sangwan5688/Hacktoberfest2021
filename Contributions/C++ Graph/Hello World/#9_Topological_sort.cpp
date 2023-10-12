/*
    TODO: Topological sort
    ? https://practice.geeksforgeeks.org/problems/topological-sort/1
*/

#include "bits/stdc++.h"
using namespace std;

// ? Vector
class Solution {
	public:
	vector<int> ans;
    void dfs(int s, vector<int> adj[], vector<bool> &visit){
        visit[s] = true;
        for(auto n : adj[s]){
            if(visit[n] == false){
                visit[n] = true;
                dfs(n,adj,visit);
            }
        }
        ans.push_back(s);
    }
	vector<int> topoSort(int n, vector<int> adj[]) {
	    vector<bool> visit(n+1,false);
        for(int i = 0;i<n;i++){
            if(visit[i] == false){
                dfs(i,adj,visit);
            }
        }
        reverse(ans.begin(),ans.end());
	    return ans;
	}
};

// ? stack teacher
class Solution {
	public:
    void dfs(int s, vector<int> adj[], stack<int> &st, vector<bool> &visit){
        visit[s] = true;
        for(auto n : adj[s]){
            if(visit[n] == false){
                visit[n] = true;
                dfs(n,adj,st,visit);
            }
        }
        st.push(s);
    }
	vector<int> topoSort(int n, vector<int> adj[]) {
	    vector<int> ans;
	    vector<bool> visit(n+1,false);
        stack<int> st;
        for(int i = 0;i<n;i++){
            if(visit[i] == false){
                dfs(i,adj,st,visit);
            }
        }
	    while(!st.empty()){
	        int n = st.top();
	        st.pop();
	        ans.push_back(n);
	    }
	    return ans;
	}
};

// ? own stack
class Solution {
	public:
	vector<int> topoSort(int n, vector<int> adj[]) {
	    vector<int> indegree(n,0),ans;
	    for(int i=0;i<n;i++) 
	        for(auto j : adj[i]) 
	            indegree[j]++;
        
        // for(auto i : indegree) cout<<i<<" ";
        // cout<<endl;
        vector<bool> visit(n+1,false);
	    queue<int> q;
	    for(int i=0;i<indegree.size();i++) if(indegree[i] == 0) q.push(i),visit[i] = true;
	    while(!q.empty()){
	        int u = q.front();
	        q.pop();
	        ans.push_back(u);
	        
	        for(auto n : adj[u]){
	           // if(visit[n] == false){
	                visit[n] = true;
	                indegree[n]--;
	                if(indegree[n] == 0) q.push(n);
	           // }
	        }
	    }
	    return ans;
	}
};