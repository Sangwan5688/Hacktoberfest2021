/*
    TODO: no of unique no
    ? you are given N <= 1e9+7 numbers, each between 0 & 1e9. How many different value appear in sequence
*/
 
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
    bitset<100001> a; // 128mb
    // bool visit[1e9 + 1] == 1GB

    int n;
    cin>>n;
    while(n--){
        int no;
        cin>>no;
        a[no] = 1;
    }

    cout<< a.count() <<endl; // O(N/32) == count TC
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}