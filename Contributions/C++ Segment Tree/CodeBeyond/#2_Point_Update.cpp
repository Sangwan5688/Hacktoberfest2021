/*
    TODO: Point Update
    ? 
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void pre(int low, int high, int ind, vector<int>& arr, 
    vector<int>& seg) {
    if(low == high) {
        seg[ind] = arr[low];
        return;
    }
    int mid = low + ((high - low)>>1);
    pre(low,mid,2*ind+1,arr,seg);
    pre(mid+1,high,2*ind+2,arr,seg);
    seg[ind] = min(seg[2*ind+1],seg[2*ind+2]);
}

int fun(int low, int high, int ind, int left, int right, 
    vector<int>& seg) {
    if(left <= low and high <= right) return seg[ind];
    else if(max(low,left) <= min(right,high)) {
        int mid = low + ((high - low)>>1);
        int l = fun(low,mid,2*ind+1,left,right,seg);
        int r = fun(mid+1,high,2*ind+2,left,right,seg);
        return min(l,r);
    } else return 1e9;
}

void update(int low, int high, int ind, int index, int value, 
    vector<int>& arr, vector<int>& seg) {
    if(low == high and low == index) {
        seg[ind] = arr[low];
        return;
    }
    // cout<<low<<" "<<high<<endl;
    int mid = low + ((high - low)>>1);
    if(low <= index and index <= mid)
        update(low,mid,2*ind+1,index,value,arr,seg);
    else if(mid+1 <= index and index <= high)
        update(mid+1,high,2*ind+2,index,value,arr,seg);

    seg[ind] = min(seg[2*ind+1],seg[2*ind+2]);
}

void solve(){
    vector<int> seg,arr;
    int n;
    cin>>n;
    arr.resize(n,0);
    seg.resize(4*n,1e9);
    
    for(auto &i : arr) cin>>i;
    pre(0,arr.size()-1,0,arr,seg);


    for(auto i : seg) cout<<i<<" ";
    cout<<endl;

    int q;
    cin>>q;
    while(q--) {
        int type;
        cin>>type;

        if(type == 1) {
            int left, right;
            cin>>left>>right;

            cout<<type<<" "<<left<<" "<<right<<" :: ";
            cout<<fun(0,n-1,0,left,right,seg)<<endl;
        } else {
            int ind,val;
            cin>>ind>>val;
            arr[ind] = val;
            update(0,n-1,0,ind,val,arr,seg);


            for(auto i : seg) cout<<i<<" ";
            cout<<endl;
        }
    }

}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}