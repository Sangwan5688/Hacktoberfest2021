/*
    TODO: Triangle in Graph
    ? Given a graph with N <= 2000 vertices, count triangle (a,b,c).
    !! wrong answer https://www.youtube.com/watch?v=jqJ5s077OKo&ab_channel=Errichto

    Adjaceny List           Bit set    
    1 : {2,4,5}             0 0 0 1 1 0 1 0 0
    2 : {1,3,4,6}           0 0 1 0 1 1 0 1 0
    3 : {2}                 0 0 0 0 0 0 1 0 0
    4 : {1,2,5,6}           0 0 1 1 0 0 1 1 0
    5 : {1,4,6}             0 0 1 0 1 0 0 1 0
    6 : {2,4,5}             0 0 0 1 1 0 1 0 0 
*/
 
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
    unordered_map<int,vector<int>> adj;
    int n,m;
    cin>>n>>m;
    while(m--){
        int u, v;
        cin>>u>>v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<bitset<n+1>> ans;

    for(auto k : adj){
        int no = k.first;
        bitset<n+1> arr;
        for(auto i : k.second){
            arr[i] = true;
        }
        ans.push_back(arr);
    }
    
    int cnt = 0;
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            int no = __builtin__popcount(ans[i]&ans[j]);
            if(no == 3) cnt++;
        }
    }

    cout<<cnt<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}