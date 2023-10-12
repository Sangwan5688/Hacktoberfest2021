/*
    TODO: Utf - 8 Encoding
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/utf-8-encoding-official/ojquestion
*/

// ? optimal
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

void solve() {
	int n;
	cin >> n;
	vector<int> v(n);
	for (int i = 0; i < v.size(); i++) {cin >> v[i];}

	bool flag = true;
	int curr = 0;
	for (auto i : v) {
		if (curr == 0) {
			if ( (i >> 3) == 0b11110) {
				curr = 3;
			} else if ( (i >> 4) == 0b1110) {
				curr = 2;
			} else if ( (i >> 5) == 0b110) {
				curr = 1;
			} else if ( (i >> 7) == 0b0) {}
			else flag = false;
		} else {
			if ( (i >> 6 ) == 0b10) {}
			else flag = false;
			curr--;
		}
	}

	if (flag) cout << "true" << endl;
	else cout << "false" << endl;
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}

// ? Brute
void solve() {
	int n;
	cin >> n;
	vector<vector<int>> ans;
	vector<int> v(n);
	for (int i = 0; i < v.size(); i++) {cin >> v[i];}


	bool flag = true;
	for (auto i : v) {
		vector<int> arr(8);
		int ind = 0;
		while (i) arr[ind] = (i % 2), i >>= 1, ind++;
		reverse(arr.begin(), arr.end());
		ans.push_back(arr);
	}


	int curr = 0;
	for (auto i : ans) {
		if (curr == 0) {
			if (i[0] and i[1] and i[2] and i[3] and !i[4]) {
				curr = 3;
			} else if (i[0] and i[1] and i[2] and !i[3]) {
				curr = 2;
			} else if (i[0] and i[1] and !i[2]) {
				curr = 1;
			} else if (!i[0]) {}
			else flag = false;
		} else {
			if (i[0] and !i[1]) {}
			else flag = false;
			curr--;
		}
	}

	if (flag) cout << "true" << endl;
	else cout << "false" << endl;
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}