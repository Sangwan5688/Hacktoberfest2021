/*
    TODO: Josephus Special
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/josephus-special-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

void solve() {
	int n, cnt = 0;
	cin >> n;
	int i = 1;
	while (i * 2 <= n) i *= 2, cnt++;

	int l = n - (1 << cnt);
	cout << 2 * l + 1 << endl;

}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}