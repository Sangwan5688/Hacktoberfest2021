/*
    TODO: Making A Large Island
    ? https://leetcode.com/problems/making-a-large-island/
*/

#include "bits/stdc++.h"
using namespace std;

class DisJointSet {
public: 
    vector<int> parent,size;
    DisJointSet(int n) {
        size.resize(n+1,1);
        parent.resize(n+1);
        for(int i=0;i<=n;i++) parent[i] = i;
    }
    int findParent(int node) {
        if(node == parent[node]) return node;
        else return parent[node] = findParent(parent[node]);
    }
    void Union(int u, int v) {
        int ult_u = findParent(u), ult_v = findParent(v);
        if(ult_u == ult_v) return;
        if(size[ult_u] < size[ult_v]) {
            parent[ult_u] = ult_v;
            size[ult_v] += size[ult_u];
        } else {
            parent[ult_v] = ult_u;
            size[ult_u] += size[ult_v];
        }
    }
};

class Solution {
  public:
    bool isValid(int i, int j, int n, int m) {
        return ((i >= 0) and (j >= 0) and (i < n) and (j < m));
    }
    vector<int> numOfIslands(int n, int m, vector<vector<int>> &operators) {
        DisJointSet dj(n*m);
        vector<bool> visit(n*m+2, false);
        vector<int> ans;
        vector<vector<int>> grid(n, vector<int> (m,0));
        map<pair<int,int>,int> mp;
        int ind = 0;
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                mp[{i,j}] = ind++;
            }
        }
        
        for(auto arr : operators){
            int i = arr[0], j = arr[1], node1 = mp[{i,j}];;
            grid[i][j] = 1;
            visit[m*i+j] = true;
            
            // up (i-1,j)
            if(isValid(i-1,j,n,m) and grid[i-1][j]) {
                int node2 = mp[{i-1,j}];
                dj.Union(node1,node2);
                visit[m*(i-1)+j] = true;
            }
            
            // down (i+1,j) 
            if(isValid(i+1,j,n,m) and grid[i+1][j]) {
                int node2 = mp[{i+1,j}];
                dj.Union(node1,node2);
                visit[m*(i+1)+j] = true;
            }
            
            // left (i,j-1) 
            if(isValid(i,j-1,n,m) and grid[i][j-1]) {
                int node2 = mp[{i,j-1}];
                dj.Union(node1,node2);
                visit[m*i+j-1] = true;
            }
            
            // right (i,j+1) 
            if(isValid(i,j+1,n,m) and grid[i][j+1]) {
                int node2 = mp[{i,j+1}];
                dj.Union(node1,node2);
                visit[m*i+j+1] = true;
            }
            
            set<int> st;
            
            for(auto &i : dj.parent) i = dj.findParent(i);
            
            for(int i=0;i<dj.parent.size();i++){
                if(visit[i]){
                    st.insert(dj.parent[i]);
                } 
            }
            ans.push_back(st.size());
        }
        return ans;
    }
};