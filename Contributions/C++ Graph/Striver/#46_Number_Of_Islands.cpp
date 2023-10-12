/*
    TODO: Number Of Islands
    ? https://practice.geeksforgeeks.org/problems/number-of-islands/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=number-of-islands
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
    DisJointSet(const DisJointSet &rhs) {
        this->parent = rhs.parent;
        this->size = rhs.size;
    }
};
class Solution {
public:
    bool isValid(int i, int j, int n, int m) {
        return ((i >= 0) and (j >= 0) and (i < n) and (j < m));
    }
    int largestIsland(vector<vector<int>>& grid) {
        std::ios::sync_with_stdio(false);
        std::cin.tie(nullptr);

        int n = grid.size(), m = grid[0].size();
        DisJointSet dj(n*m);
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j]){
                    int node1 = i*m + j;
                    // up (i-1,j)
                    if(isValid(i-1,j,n,m) and grid[i-1][j]) {
                        int node2 = (i-1)*m + j;
                        dj.Union(node1,node2);
                    }
                    
                    // down (i+1,j) 
                    if(isValid(i+1,j,n,m) and grid[i+1][j]) {
                        int node2 = (i+1)*m + j;
                        dj.Union(node1,node2);
                    }
                    
                    // left (i,j-1) 
                    if(isValid(i,j-1,n,m) and grid[i][j-1]) {
                        int node2 = i*m+j-1;
                        dj.Union(node1,node2);
                    }
                    
                    // right (i,j+1) 
                    if(isValid(i,j+1,n,m) and grid[i][j+1]) {
                        int node2 = i*m+j+1;
                        dj.Union(node1,node2);
                    }
                }
            }
        }

        for(auto &i : dj.parent) i = dj.findParent(i); 

        int maxi = 0;
        map<int,int> mp;
        for(auto &i : dj.parent) mp[i]++; 
        for(auto [no,cnt] : mp) maxi = max(maxi,cnt);

        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(!grid[i][j]){
                    int node1 = i*m + j;
                    set<int> st;

                    // up (i-1,j)
                    if(isValid(i-1,j,n,m) and grid[i-1][j]) {
                        int node2 = (i-1)*m + j;
                        st.insert(dj.findParent(node2));
                    }
                    
                    // down (i+1,j) 
                    if(isValid(i+1,j,n,m) and grid[i+1][j]) {
                        int node2 = (i+1)*m + j;
                        st.insert(dj.findParent(node2));
                    }
                    
                    // left (i,j-1) 
                    if(isValid(i,j-1,n,m) and grid[i][j-1]) {
                        int node2 = i*m+j-1;
                        st.insert(dj.findParent(node2));
                    }
                    
                    // right (i,j+1) 
                    if(isValid(i,j+1,n,m) and grid[i][j+1]) {
                        int node2 = i*m+j+1;
                        st.insert(dj.findParent(node2));
                    }

                    int cnt = 1;
                    for(auto i : st) cnt += mp[i];
                    maxi = max(maxi,cnt);
                }
            }
        }

        // for(auto i : dj.parent) cout<<i<<" "; cout<<endl;
        return maxi;
    }
};
