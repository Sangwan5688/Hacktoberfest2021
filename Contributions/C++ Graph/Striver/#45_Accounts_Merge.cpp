/*
    TODO: Accounts Merge
    ? https://leetcode.com/problems/accounts-merge/
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
    int findParent(int node){
        if(node == parent[node]) return node;
        else return parent[node] = findParent(parent[node]);
    }
    void Union(int u, int v){
        int ult_u = findParent(u), ult_v = findParent(v);
        if(ult_u == ult_v) return;

        if(size[ult_u] < size[ult_v]){
            parent[ult_u] = ult_v;
            size[ult_v] += size[ult_u];
        }else{
            parent[ult_v] = ult_u;
            size[ult_u] += size[ult_v];
        }
    }
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int index = 0, ind = 0, n = accounts.size();
        DisJointSet dj(n-1);
        map<string,int> mp;
        map<int,string> mpR;

        for(auto arr : accounts) {
            for(int i=1;i<arr.size();i++) {
                if(mp.find(arr[i]) == mp.end()) 
                    mpR[index] = arr[i], mp[arr[i]] = index++;
            }
        }

        vector<bitset<10001>> temp;
        for(auto arr : accounts) {
            bitset<10001> bt;
            for(int i=1;i<arr.size();i++) {
                bt[mp[arr[i]]] = true;
            }
            temp.push_back(bt);
        }

        for(int i=0;i<temp.size();i++) {
            for(int j=i+1;j<temp.size();j++) {
                // cout<<i<<" "<<accounts[i][0]<<" "<<temp[i]<<endl;
                // cout<<j<<" "<<accounts[j][0]<<" "<<temp[j]<<endl;
                // cout<<i<<" "<<j<<" -- "<<(temp[i]&temp[j])<<endl;
                if((temp[i]&temp[j]).count() > 0) {
                    dj.Union(i,j);
                    // cout<<i<<" "<<j<<", ";
                }
            }
            // cout<<endl;
        }

        vector<vector<string>> ans;
        for(auto &i : dj.parent) i = dj.findParent(i);
        unordered_map<int,vector<int>> adj;
        for(int i=0;i<dj.parent.size();i++) {
            // cout<<dj.parent[i]<<" ";
            adj[dj.parent[i]].push_back(i);
        }
        // cout<<endl;


        // for(auto [no,str] : mpR){
        //     cout<<no<<" "<<str<<endl;
        // }

        for(auto [no,arr] : adj) {
            vector<string> k;
            bitset<10001> bt;
            for(auto i : arr) {
                bt = bt | temp[i];
            }
            for(int i=0;i<bt.size();i++){
                if(bt.test(i)){
                    k.push_back(mpR[i]);
                }
            }
            sort(k.begin(),k.end());
            k.insert(k.begin(),accounts[no][0]);
            ans.push_back(k);
        }

        return ans;
    }
};
