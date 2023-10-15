/*
    TODO: Triplets - 1
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/triplets-1-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

void solve() {
	int n;
	cin >> n;
	vector<int> v(n);
	for (int i = 0; i < v.size(); i++) {cin >> v[i];}

	int ans = 0;
	for (int i = 0; i < v.size(); i++) {
		int xo = v[i];
		for (int k = i + 1; k < v.size(); k++) {
			xo = xo ^ v[k];
			if (xo == 0) {
				ans += (k - i);
			}
		}
	}
	cout << ans << endl;

}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}