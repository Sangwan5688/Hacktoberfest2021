/*
    TODO: Solve 7n By 8
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/solve-7nby8-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
	int n;
	cin >> n;

	n =  (n << 3) - n;
	int co = (n >> 3);
	cout << co << endl;
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
// 	cin >> t;
	while (t--) solve();
	return 0;
}