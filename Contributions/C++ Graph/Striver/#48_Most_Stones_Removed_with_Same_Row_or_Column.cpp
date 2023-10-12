/*
    TODO: Most Stones Removed with Same Row or Column
    ? https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/
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
    int removeStones(vector<vector<int>>& stones) {
        int n = stones.size();
        DisJointSet dj(n-1);
        for(int i=0;i<n;i++) {
            for(int j=i+1;j<n;j++) {
                if(stones[i][0] == stones[j][0] or stones[i][1] == stones[j][1]) {
                    dj.Union(i,j);
                    // cout<<i<<" "<<j<<", ";
                }
            }
            // cout<<endl;
        }

        for(auto &i : dj.parent) i = dj.findParent(i);

        map<int,int> mp;
        for(auto i : dj.parent) mp[i]++;
        int maxi = 0;
        for(auto [no,cnt] : mp) maxi += cnt-1;
        return maxi;
    }
};