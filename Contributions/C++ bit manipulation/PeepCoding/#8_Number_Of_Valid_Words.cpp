/*
    TODO: Number Of Valid Words
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/number-of-valid-words-official/ojquestion
*/
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

string decimalToBinary(int n) {
	string s = bitset<64> (n).to_string();
	const auto loc1 = s.find('1');
	if (loc1 != string::npos)
		return s.substr(loc1);
	return "0";
}

void solve() {
	int n;
	cin >> n;
	vector<int> bit(n, 0);
	vector<string> v;
	for (int i = 0; i < n; ++i) {
		string s;
		cin >> s;

		for (int j = 0; j < s.size(); j++) {
			int ind = (s[j] - 'a');
			// cout << ind << endl;
			bit[i]  |= (1 << ind);
		}

		v.push_back(s);
	}

	// for (auto i : bit) {
	// 	cout << decimalToBinary(i) << endl;
	// }

	cin >> n;
	for (int _ = 0; _ < n; ++_) {
		string s;
		cin >> s;
		int ss = 0;
		for (auto i : s) {
			int ind = i - 'a';
			ss |= (1 << ind);
		}

		int cnt = 0;
		for (auto i : bit) {
			if (i == (i & ss) and (i & (1 << (s[0] - 'a'))) )
				cnt++;
		}

		cout << s << " -> " << cnt << endl;
	}
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}