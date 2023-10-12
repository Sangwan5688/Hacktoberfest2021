/*
    TODO: Min Xor Pairs
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/min-xor-pairs-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

// ! optimal
void solve() {
	int n;
	cin >> n;
	vector<int> v(n);
	for (int i = 0; i < v.size(); i++) {cin >> v[i];}

	sort(v.begin(), v.end());
	map<int, vector<pair<int, int>>> mp;
	for (int i = 0; i < n - 1; i++) {
		mp[(v[i] ^ v[i + 1])].push_back({v[i], v[i + 1]});
	}

	for (auto i : mp.begin()->second) {
		cout << i.first << ", " << i.second << endl;
	}
}

// ? Brute
void solve() {
	int n;
	cin >> n;
	vector<int> v(n);
	for (int i = 0; i < v.size(); i++) {cin >> v[i];}

	sort(v.begin(), v.end());
	map<int, vector<pair<int, int>>> mp;
	for (int i = 0; i < n; i++) {
		for (int j = i + 1; j < n; j++) {
			mp[(v[i] ^ v[j])].push_back({v[i], v[j]});
			// cout << (v[i] ^ v[j]) << " " << v[i] << ", " << v[j] << endl;
		}
	}

	for (auto i : mp.begin()->second) {
		cout << min(i.first, i.second) << ", " << max(i.first, i.second) << endl;
	}
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}