// time-limit: 2000
// problem-url: https://codeforces.com/contest/1547/problem/C
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<ll> vl;
typedef pair<int, int> pi;
typedef pair<ll, ll> pl;

int k, n, m;
// O(n)
void solve() {
	cin >> k >> n >> m;

	int arrn[n];
	int arrm[m];
	vi res;
	for (int i = 0; i < n; ++i) {
		cin >> arrn[i];
	}
	for (int i = 0; i < m; ++i) {
		cin >> arrm[i];
	}

	int i = 0;
	int j = 0;
	while (i < n && j < m) {
		if (arrn[i] <= arrm[j]) {
			res.push_back(arrn[i]);
			i++;
		} else {
			res.push_back(arrm[j]);
			j++;
		}
	}
	while (i < n) {
		res.push_back(arrn[i]);
		i++;
	}
	while (j < m) {
		res.push_back(arrm[j]);
		j++;
	}

	if (res.empty()) {
		cout << -1 << '\n';
		return;
	}
	for (int& e: res) {
		if (e == 0) {
			k++;
		} else if (e > k) {
			cout << -1 << '\n';
			return;
		}
	}
	for (int& e: res) {
		cout << e << " ";
	}
	cout << '\n';
}

int main(int argc, const char** argv) {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	int t;
	cin >> t;
	while (t--) {
		solve();
	}
    return 0;
}
