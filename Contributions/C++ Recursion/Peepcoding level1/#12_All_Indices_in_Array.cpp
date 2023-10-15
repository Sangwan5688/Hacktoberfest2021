/* 
    TODO: All Indices in Array
 */

#include "bits/stdc++.h"
using namespace std;

void pre(vector<int>& arr, int index, int key, vector<int>& ds) {
    int n = arr.size();
    if(index == n) return;

    if(arr[index] == key) ds.push_back(index);
    pre(arr,index + 1,key,ds);
}

void solve(){
    int n,x;
    cin>>n>>x;
    vector<int> v(n),ans;
    for(int i=0;i<v.size();i++){cin>>v[i];}

    pre(v,0,x,ans);
    
    for(auto i : ans)
        cout<<i<<" ";
    cout<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;  
    while (t--) solve();
    return 0;
} 

