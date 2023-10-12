/*
    TODO: Gray Code
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/gray-code/ojquestion
*/
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

vector<vector<int>> ans;

void pre(int index, vector<int>& inc, vector<int> &skills, vector<vector<int>> &mp
         , map<string, int> &mp1) {
	int cnt = 0;
	for (auto i : skills) if (i == 1) cnt++;
	if (cnt == skills.size()) {
		// for (auto i : skills)
		// 	cout << i << " ";
		// cout << endl;

		ans.push_back(inc);
		return;
	}
	if (index == mp.size()) return;

	pre(index + 1, inc, skills, mp, mp1);

	vector<int> skill = skills;
	for (int j = 0; j < skills.size(); j++) skill[j] |= mp[index][j];
	inc.push_back(index);
	pre(index + 1, inc, skill, mp, mp1);
	inc.pop_back();
}

void solve() {
	int n;
	cin >> n;
	map<string, int> mp1;
	for (int i = 0; i < n; i++) {
		string skill;
		cin >> skill;
		mp1[skill] = i;
	}

	cin >> n;
	vector<vector<int>> mp(n, vector<int> (mp1.size(), 0));

	for (int i = 0; i < n; ++i) {
		int items;
		cin >> items;
		while (items--) {
			string skill;
			cin >> skill;
			mp[i][mp1[skill]] = 1;
		}
	}


	vector<int> skills(mp1.size(), 0);
	vector<int> inc;
	pre(0, inc, skills, mp, mp1);

	int mini = 1e9;
	vector<int> ans1(skills.size());
	for (auto i : ans) {
		// cout << i.size() << " " << mini << endl;
		if (i.size() < mini) ans1 = i, mini = i.size();
	}

	// cout << "one of the best result" << endl;

	cout << "[";
	for (int i = 0; i < ans1.size(); i++) {
		if (i != ans1.size() - 1)
			cout << ans1[i] << ", ";
		else
			cout << ans1[i];
	}
	cout << "]" << endl;

	// cout << "skills of all indivisual" << endl;
	// for (auto i : mp) {
	// 	for (auto j : i) {
	// 		cout << j << " ";
	// 	}
	// 	cout << endl;
	// }

	// cout << "ans vector for all possible ans" << endl;
	// for (auto i : ans) {
	// 	for (auto j : i) {
	// 		cout << j << " ";
	// 	}
	// 	cout << endl;
	// }
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}