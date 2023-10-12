/*
    TODO: Xor Of Sum Of All Pairs
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/xor-sum-pair-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

void solve() {
	int n, xo = 0;
	cin >> n;
	vector<int> v(n);
	for (int i = 0; i < v.size(); i++) {cin >> v[i]; xo ^= (v[i] + v[i]);}

	cout << xo << endl;
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}