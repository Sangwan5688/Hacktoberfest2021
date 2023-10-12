/*
    TODO: Pepcoder And Bits
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/pepcoder-and-bits-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

int csb(int n) {
	int cnt = 0;
	while (n > 0) {
		long rmsb = n & -n;
		n = n - rmsb;
		cnt++;
	}
	return cnt;
}

int uniq(int n, int r) {
	if (n < r) return 0;
	int res = 1;
	for (int i = 0; i < r; i++) {
		res = res * (n - i);
		res = res / (i + 1);
	}
	return res;
}

int solution(int n, int k, int ind) {
	if (ind == 0) return 0;

	int mask = (1ll << ind);
	int res = 0;
	if (n & mask) {
		res += solution(n, k - 1, ind - 1);
		// res += solution(n, k, ind - 1);
		res += uniq(ind, k);
	} else res = solution(n, k, ind - 1);
	return res;
}

void solve() {
	int n;
	cin >> n;

	int k = csb(n);
	cout << solution(n, k, 63) << endl;
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}