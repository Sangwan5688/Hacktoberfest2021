/*
    TODO: Reduce N To 1
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/reduce-n-to-1-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

void solve() {
	int n, cnt = 0;
	cin >> n;

	while (n != 1) {
		int rem = n % 4;
		if (rem == 0 or rem == 2) n >>= 1;
		else if (rem == 1) n--;
		else n++;
		cnt++;
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