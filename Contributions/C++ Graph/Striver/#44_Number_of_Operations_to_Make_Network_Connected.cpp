/*
    TODO: Number of Operations to Make Network Connected
    ? https://leetcode.com/problems/number-of-operations-to-make-network-connected/
*/

#include "bits/stdc++.h"
using namespace std;

class DisJointSet {
public:
    vector<int> size,parent;
    DisJointSet(int n) {
        size.resize(n,1);
        parent.resize(n);
        for(int i=0;i<n;i++) parent[i] = i;
    }
    int findParent(int n) {
        if(n == parent[n]) return n;
        else return parent[n] = findParent(parent[n]);
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
    int makeConnected(int n, vector<vector<int>>& connections) {
        DisJointSet dj(n);
        int cnt = 0;
        for(auto arr : connections){
            int u = arr[0], v = arr[1];
            if(dj.findParent(u) != dj.findParent(v)) {
                dj.Union(u,v);
            }else cnt++;
        }
        for(auto &i : dj.parent) i = dj.findParent(i);

        bitset<10000002> bt;
        for(auto i : dj.parent) bt[i] = 1;

        if(bt.count() - 1 <= cnt) return bt.count() - 1;
        else return -1;
    }
};