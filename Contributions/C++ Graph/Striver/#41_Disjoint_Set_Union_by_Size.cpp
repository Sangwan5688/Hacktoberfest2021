#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

class DisjointSet {
    vector<int> size,parent;
public:
    DisjointSet(int n) {
        parent.resize(n+1);
        for(int i=0;i<=n;i++) parent[i] = i;
        size.resize(n+1,1);
    };

    int findUPar(int node) {
        if(node == parent[node]) return node;
        else parent[node] = findUPar(parent[node]);
    }

    void unionBySize(int u, int v){
        int ult_u = findUPar(u);
        int ult_v = findUPar(v);

        if(ult_v == ult_u) return;

        if(size[ult_u] < size[ult_v]){
            parent[ult_u] = ult_v;
            size[ult_v] += size[ult_u];
        }else{
            parent[ult_v] = ult_u;
            size[ult_u] += size[ult_v];
        }
    }

    ~DisjointSet() {};
};

void solve(){
    DisjointSet ds(7);
    ds.unionBySize(1, 2); 
    ds.unionBySize(2, 3); 
    ds.unionBySize(4, 5); 
    ds.unionBySize(6, 7); 
    ds.unionBySize(5, 6); 
    // if 3 and 7 same or not 
    if(ds.findUPar(3) == ds.findUPar(7)) {
        cout << "Same\n"; 
    }
    else cout << "Not same\n"; 

    ds.unionBySize(3, 7); 

    if(ds.findUPar(3) == ds.findUPar(7)) {
        cout << "Same\n"; 
    }
    else cout << "Not same\n"; 

}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}

//! Java
class DisJointSet {
    public int[] parent,size;
    public DisJointSet(int n) {
        size = new int[n+1];
        parent = new int[n+1];
        for(int i=0;i<=n;i++) {
            size[i] = 1;
            parent[i] = i;
        }
    }
    public int findParent(int node) {
        if(node == parent[node]) return node;
        else {
            parent[node] = findParent(parent[node]);
            return parent[node];
        }
    }
    public void Union(int u, int v) {
        int ult_u = findParent(u), ult_v = findParent(v);
        if(ult_u == ult_v) return;
        if(size[ult_u] < size[ult_v]) {
            parent[ult_u] = ult_v;
            size[ult_v] += size[ult_u];
        }else{
            parent[ult_v] = ult_u;
            size[ult_u] += size[ult_v];
        }
    }
}