/*
    TODO: Sereja and Brackets
    ? https://codeforces.com/problemset/problem/380/C
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

class Node {
public:
    int open, close, full;
    Node() : open(0), close(0), full(0) {};
    print() {
        cout<<open<<" "<<close<<" "<<full<<endl;
    }
    ~Node() {};
};

void build(int low, int high, int ind, string& str, vector<Node>& seg) {
    if(low == high) {
        // cout<<ind<<" :: ";
        if(str[low] == '(') seg[ind].open++;
        else seg[ind].close++;
        // seg[ind].print();
        
        return;
    }
    int mid = low + ((high - low)>>1);
    build(low,mid,2*ind+1,str,seg);
    build(mid+1,high,2*ind+2,str,seg);

    int f = min(seg[2*ind+1].open,seg[2*ind+2].close);
    //! Error erase previous data recorded
    // seg[2*ind+1].open -= f;
    // seg[2*ind+2].close -= f;

    seg[ind].open = seg[2*ind + 1].open + seg[2*ind+2].open - f;
    seg[ind].close = seg[2*ind + 1].close + seg[2*ind+2].close - f;
    seg[ind].full += f + seg[2*ind + 1].full + seg[2*ind+2].full;

    // cout<<ind<<" -- ";
    // seg[ind].print();
}

Node query(int low, int high, int ind, int left, int right, string& str,
        vector<Node>& seg) {
    Node n;
    if(left <= low and high <= right) return seg[ind];
    else if(max(low,left) <= min(high,right)) {
        int mid = low + ((high - low)>>1);
        Node l = query(low,mid,2*ind+1,left,right,str,seg);
        Node r = query(mid+1,high,2*ind+2,left,right,str,seg);

        int f = min(l.open,r.close);

        n.open = l.open + r.open - f;
        n.close = l.close + r.close - f;
        n.full = f + l.full + r.full;

        return n;
    } else {
        return n;
    }
}

void solve() {
    string s;
    cin>>s;

    int n = s.size(), m;
    cin>>m;

    vector<Node> seg(4*n+1);
    build(0,n-1,0,s,seg);

    // for(int i=0;i<seg.size();i++) {
    //     cout<<i<<"~~ ";
    //     seg[i].print();
    // }

    while(m--) {
        int l, r;
        cin>>l>>r;
        cout<<query(0, n-1, 0, l-1, r-1, s, seg).full*2<<endl;
    }
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}