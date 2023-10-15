/*
    TODO: Print Value Of Rsb Mask
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/print-value-of-rsb-mask-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

void solve() {
	int n;
	cin >> n;
	int rmsb = n & -n;

    //  int rmsb = (n&-n);
    // System.out.println( Integer.toBinaryString(rmsb) );

	vector<int> v;
	while (rmsb) {
		if (rmsb & 1) v.push_back(1);
		else v.push_back(0);
		rmsb >>= 1;
	}
	reverse(v.begin(), v.end());
	for (auto i : v) cout << i;
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}