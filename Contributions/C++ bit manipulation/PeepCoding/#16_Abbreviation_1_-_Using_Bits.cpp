/*
    TODO: Abbreviation 1 - Using Bits
    ! failed by why
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/abrreviation1-using-bits-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

void solve() {
	string s;
	cin >> s;

	int n = s.size();
	for (int no = 0; no < (1 << n); no++) {
		int cnt = 0;
		for (int i = 0; i < n; i++) {
			if (!(no & (1 << i))) {
				if (cnt != 0) cout << cnt << " ";
				cnt = 0;
				cout << s[i] << " ";
			} else cnt++;
		}
		if (cnt != 0) cout << cnt;
		cout << endl;
	}


}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}