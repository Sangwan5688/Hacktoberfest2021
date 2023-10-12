/*
    TODO: Number of Provinces
    ? https://practice.geeksforgeeks.org/problems/number-of-provinces/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=number-of-provinces
*/

#include "bits/stdc++.h"
using namespace std;

class DisjointSet {
public: 
    vector<int> size,parent;
    DisjointSet(int n) {
        size.resize(n+1,1);
        parent.resize(n+1);
        for(int i=0;i<=n;i++) parent[i] = i;
    }
    int findParent(int node) {
        if(node == parent[node]) return node;
        else return parent[node] = findParent(parent[node]);
    }
    void Union(int u, int v) {
        int ult_u = findParent(u);
        int ult_v = findParent(v);
        if(ult_u == ult_v) return;

        if(size[ult_u] < size[ult_v]) {
            parent[ult_u] = ult_v;
            size[ult_v] += size[ult_u];
        }else {
            parent[ult_v] = ult_u;
            size[ult_u] += size[ult_v];
        }
    }
};

class Solution {
  public:
    int numProvinces(vector<vector<int>> adj, int n) {
        DisjointSet dj(n);
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                if(adj[i][j]){
                    dj.Union(i+1,j+1);
                }
            }
        }
        for(auto &i : dj.parent){
            i = dj.findParent(i);
        }
        bitset<505> bit;
        for(int i=1;i<dj.parent.size();i++){
            // cout<<dj.parent[i]<<" ";
            bit[dj.parent[i]] = true;
        }
        // cout<<endl;
        return bit.count();
    }
};