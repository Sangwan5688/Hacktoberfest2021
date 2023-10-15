/*
    TODO: Kernighans Algorithm
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/kernighans-algo-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

void solve() {
	int n;
	cin >> n;
	int cnt = 0;
	while(n){
	    if(n&1) cnt++;
	    n >>= 1;
	}
	cout << cnt << endl;
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}