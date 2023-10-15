/*
    TODO: Template Code
    ? 
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

class SGTree{
public:
    vector<int> seg;
    SGTree(int n) {
        seg.resize(4*n+1,1e9);
    }

    void build(int low, int high, int ind, vector<int>& arr) {
        if(low == high) {
            seg[ind] = arr[low];
            return;
        }
        int mid = low + ((high - low)>>1);
        build(low,mid,2*ind+1,arr);
        build(mid+1,high,2*ind+2,arr);
        seg[ind] = min(seg[2*ind+1],seg[2*ind+2]);
    }

    int query(int low, int high, int ind, int left, int right) {
        if(left <= low and high <= right) return seg[ind];
        else if(max(low,left) <= min(right,high)) {
            int mid = low + ((high - low)>>1);
            int l = query(low,mid,2*ind+1,left,right);
            int r = query(mid+1,high,2*ind+2,left,right);
            return min(l,r);
        } else return 1e9;
    }

    void update(int low, int high, int ind, int index, int value, vector<int>& arr) {
        if(low == high and low == index) {
            seg[ind] = arr[low];
            return;
        }
        int mid = low + ((high - low)>>1);
        if(low <= index and index <= mid)
            update(low,mid,2*ind+1,index,value,arr);
        else if(mid+1 <= index and index <= high)
            update(mid+1,high,2*ind+2,index,value,arr);

        seg[ind] = min(seg[2*ind+1],seg[2*ind+2]);
    }

    ~SGTree() {};
};

void solve2() {
    int n;
    cin>>n;
    vector<int> arr1(n);
    for(auto &i : arr1) cin>>i;
    SGTree sg1(n);
    sg1.build(0,n-1,0,arr1);

    int m;
    cin>>m;
    vector<int> arr2(m);
    for(auto &i : arr2) cin>>i;
    SGTree sg2(m);
    sg2.build(0,m-1,0,arr2);

    int q;
    cin>>q;
    while(q--) {
        int type;
        cin>>type;

        if(type == 1) {
            int l1,r1,l2,r2;
            cin>>l1>>r1>>l2>>r2;

            int val1 = sg1.query(0,n-1,0,l1,r1);
            int val2 = sg2.query(0,m-1,0,l2,r2);

            cout<<min(val1,val2)<<endl;
        } else {
            int arrNo,ind,val;
            cin>>arrNo>>ind>>val;

            if(arrNo == 1) {
                arr1[ind] = val;
                sg1.update(0,n-1,0,ind,val,arr1);
            } else {
                arr2[ind] = val;
                sg2.update(0,m-1,0,ind,val,arr2);
            }
        }
    }
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve2();
    return 0;
}