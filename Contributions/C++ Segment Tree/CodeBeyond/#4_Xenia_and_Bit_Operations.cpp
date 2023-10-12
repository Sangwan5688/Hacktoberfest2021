/*
    TODO: Xenia and Bit Operations
    ? https://codeforces.com/problemset/problem/339/D
*/


#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void build(int low, int high, int ind, vector<int>& v, 
        vector<int>& seg, bool flag) {
    if(low == high) {
        seg[ind] = v[low];
        return;
    }

    int mid = low + ((high - low)>>1);

    build(low,mid,2*ind+1,v,seg,!flag);
    build(mid+1,high,2*ind+2,v,seg,!flag);

    if(flag) seg[ind] = seg[2*ind+1] | seg[2*ind+2];
    else seg[ind] = seg[2*ind+1] ^ seg[2*ind+2];
}

void update(int low, int high, int ind, int index, int value, 
        vector<int>& v, vector<int>& seg, bool flag) {
    if(low == high) {
        seg[ind] = value;
        return;
    }
    int mid = low + ((high - low)>>1);
    //! ERROR
    if(index <= mid) update(low,mid,2*ind+1,index,value,v,seg,!flag);
    else update(mid+1,high,2*ind+2,index,value,v,seg,!flag);

    if(flag) seg[ind] = seg[2*ind+1] | seg[2*ind+2];
    else seg[ind] = seg[2*ind+1] ^ seg[2*ind+2];
}

void solve() {
    int base, m, n;
    cin>>base>>m;
    n = (int)pow(2,base);

    vector<int> v(n,0), seg(4*n+1,1e9);
    for(auto &i : v) cin>>i;

    build(0, n-1, 0, v, seg,(base%2 == 0 ? 0 : 1));

    while(m--) {
        int index,value;
        cin>>index>>value;
        
        v[index-1] = value;
        update(0, n-1, 0, index-1, value, v, seg,(base%2 == 0 ? 0 : 1));
        cout<<seg[0]<<endl;
    }
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}