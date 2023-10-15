/*
    TODO: Inversion Count
    ? https://www.spoj.com/problems/INVCNT/
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

class SGTree{
public:
    vector<int> seg;
    SGTree(int n) {
        seg.resize(4*n+1,0);
    }

    void build(int low, int high, int ind, vector<int>& arr) {
        if(low == high) {
            seg[ind] = arr[low];
            return;
        }
        int mid = low + ((high - low)>>1);
        build(low,mid,2*ind+1,arr);
        build(mid+1,high,2*ind+2,arr);
        seg[ind] = seg[2*ind+1]+seg[2*ind+2];
    }

    int query(int low, int high, int ind, int left, int right) {
        if(left <= low and high <= right) return seg[ind];
        else if(max(low,left) <= min(right,high)) {
            int mid = low + ((high - low)>>1);
            int l = query(low,mid,2*ind+1,left,right);
            int r = query(mid+1,high,2*ind+2,left,right);
            return l+r;
        } else return 0;
    }

    void update(int low, int high, int ind, int index, int value, vector<int>& arr) {
        if(low == high and low == index) {
            seg[ind] += arr[low];
            return;
        }
        int mid = low + ((high - low)>>1);
        if(low <= index and index <= mid)
            update(low,mid,2*ind+1,index,value,arr);
        else if(mid+1 <= index and index <= high)
            update(mid+1,high,2*ind+2,index,value,arr);

        seg[ind] = seg[2*ind+1] + seg[2*ind+2];
    }

    ~SGTree() {};
};

void solve() {
    int n, mx = -1;
    cin>>n;
    vector<int> arr(n,0);
    for(auto &i : arr) cin>>i,mx = max(mx,i);
    mx++;
    
    vector<int> freq(mx,0);
    for(auto i : arr) freq[i]++;

    SGTree sg(mx);
    sg.build(0,mx-1,0,freq);

    cout<<sg.seg[0]<<endl;

    int cnt = 0;
    for(int i=0;i<n;i++) {
        freq[arr[i]]--;
        sg.update(0,mx-1,0,arr[i],-1,freq);

        cnt+= sg.query(0,mx-1,0,1,arr[i]-1);
    }
    
    cout<<cnt<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    cin >> t;
    while (t--) solve();
    return 0;
}

//! Striver correct
class SGTree {
public: vector<int> seg;
public:
	SGTree(int n) {
		seg.resize(4 * n + 1);
	}
 
	void build(int ind, int low, int high, int arr[]) {
		if (low == high) {
			seg[ind] = arr[low];
			return;
		}
 
		int mid = (low + high) / 2;
		build(2 * ind + 1, low, mid, arr);
		build(2 * ind + 2, mid + 1, high, arr);
		seg[ind] = seg[2 * ind + 1] + seg[2 * ind + 2];
	}
 
	int query(int ind, int low, int high, int l, int r) {
		// no overlap
		// l r low high or low high l r
		if (r < low || high < l) return 0;
 
		// complete overlap
		// [l low high r]
		if (low >= l && high <= r) return seg[ind];
 
		int mid = (low + high) >> 1;
		int left = query(2 * ind + 1, low, mid, l, r);
		int right = query(2 * ind + 2, mid + 1, high, l, r);
		return left + right;
	}
	void update(int ind, int low, int high, int i, int val) {
		if (low == high) {
			//!! imp +=
			seg[ind] += val;
			return;
		}
 
		int mid = (low + high) >> 1;
		if (i <= mid) update(2 * ind + 1, low, mid, i, val);
		else update(2 * ind + 2, mid + 1, high, i, val);
		seg[ind] = seg[2 * ind + 1] + seg[2 * ind + 2];
	}
};
void solve5() {
	int n;
	cin >> n;
	int arr[n];
	int mx = -1;
	for (int i = 0; i < n; i++) {
		cin >> arr[i];
		mx = max(mx, arr[i]);
	}
	mx += 1;
	int freq[mx];
	memset(freq, 0, sizeof freq);
	for (int i = 0; i < n; i++) {
		freq[arr[i]]++;
	}
 
	SGTree st(mx);
	st.build(0, 0, mx - 1, freq);
	//cout << st.seg[0] << endl;
 
	int cnt = 0;
	for (int i = 0; i < n; i++) {
		freq[arr[i]]--;
		st.update(0, 0, mx - 1, arr[i], -1);
 
		cnt += st.query(0, 0, mx - 1, 1, arr[i] - 1);
	}
 
	cout << cnt << endl;
 
}
signed main() {
#ifndef ONLINE_JUDGE
	freopen("input.txt", "r", stdin);
	freopen("output.txt", "w", stdout);
#endif
	solve5();
	return 0;
}
 
 