/*
    TODO: Flip in range
    ! incomplete
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;


class LazySGTree {
public:
    vector<int> seg, lazy;
    LazySGTree(int n) {
        seg.resize(4*n+1,0);
        lazy.resize(4*n+1,0);
    };
    void build(int low, int high, int ind, vector<int>& arr) {
        if(low == high) {
            seg[ind] = arr[low];
            return;
        }
        int mid = low + ((high - low)>>1);
        build(low,mid,2*ind+1,arr);
        build(mid+1,high,2*ind+2,arr);

        seg[ind] = seg[2*ind+1] + seg[2*ind+2];
    }
    void update(int low, int high, int ind, int left, int right, int val,
        vector<int> arr) {

        if(lazy[ind] != 0) {
            seg[ind] = (high - low + 1) - seg[ind];

            // propograte downward
            if(low != high) {
                lazy[2*ind+1] = !lazy[2*ind+1];
                lazy[2*ind+2] = !lazy[2*ind+2];
            }
            lazy[ind] = 0;
        }

        if(left <= low and high <= right) {
            seg[ind] += (high - low + 1) - val;
            // lazy propogate down
            if(low != high) {
                lazy[2*ind+1] = !lazy[2*ind+1];
                lazy[2*ind+2] = !lazy[2*ind+2];
            }
            
            return;
        } else if(max(low,left) <= min(high,right)) {
            int mid = low + ((high - low)>>1);

            update(low,mid,2*ind+1,left,right,val,arr);
            update(mid+1,high,2*ind+2,left,right,val,arr);

            seg[ind] = min(seg[2*ind+1], seg[2*ind+2]);
        } else return;
    }
    int query(int low, int high, int ind, int left, int right) {
        if(lazy[ind] != 0) {
            seg[ind] = (high - low + 1) - seg[ind];

            // propograte downward
            if(low != high) {
                lazy[2*ind+1] = !lazy[2*ind+1];
                lazy[2*ind+2] = !lazy[2*ind+2];
            }
            lazy[ind] = 0;
        }

        if(left <= low and high <= right) return seg[ind];
        else if(max(low,left) <= min(high,right)) {
            int mid = low + ((high - low)>>1);

            int left = query(low,mid,2*ind+1,left,right);
            int right = query(mid+1,high,2*ind+2,left,right);

            seg[ind] = left + right;
        } else return 0;
    }
    ~LazySGTree() {};
};

void solve() {
    int n,m;
    cin>>n;
    vector<int> v(n);
    for(auto &i : v) cin>>i;
    LazySGTree sg(n);
    sg.build(0,n-1,0,v);

    int q;
    cin>>q;
    while(q--) {
        int type;
        cin>>type;

        if(type == 1) {
            int left, right;
            cin>>left>>right;
            cout<<sg.query(0,n-1,0,left,right)<<endl;
        } else {
            int left, right, val;
            cin>>left>>right>>val;
            sg.update(0,n-1,0,left,right,val,v);
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