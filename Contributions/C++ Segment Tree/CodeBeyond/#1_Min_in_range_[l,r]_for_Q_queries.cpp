/*
    TODO: Min in range [l,r] for Q queries
    ? 
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

vector<int> arr = {2,1,0,4,3,7};  

int pre(int low, int high, int ind, vector<int>& arr, 
    vector<int>& seg) {
    if(low == high) {
        seg[ind] = arr[low];
        return arr[low];
    }
    int mid = low + ((high - low)>>1);
    int min1 = pre(low,mid,2*ind+1,arr,seg);
    int min2 = pre(mid+1,high,2*ind+2,arr,seg);
    seg[ind] = min(min1,min2);
    //! seg[ind] = min(seg[2*ind+1],seg[2*ind+2]);
}

int fun(int low, int high, int ind, int left, int right, vector<int>& seg) {
    if(left <= low and high <= right) return seg[ind];
    else if(max(low,left) <= min(right,high)) {
        int mid = low + ((high - low)>>1);
        int l = fun(low,mid,2*ind+1,left,right,seg);
        int r = fun(mid+1,high,2*ind+2,left,right,seg);
        return min(l,r);
    } else return 1e9;
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
        int left, right;
        cin>>left>>right;

        cout<<left<<" "<<right<<" :: ";
        cout<<fun(0,n-1,0,left,right,seg)<<endl;;
    }

}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}