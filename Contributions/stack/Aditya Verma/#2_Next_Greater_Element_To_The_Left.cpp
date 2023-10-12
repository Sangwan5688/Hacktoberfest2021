/*
    TODO: Next Greater Element To The Left
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/stacks/next-greater-element-left-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

vector<int> Smallestonleft(vector<int> arr, int n) {
	vector<int> ans(n, 0);
	stack<int> st;
	for (int i = 0; i < n; i++) {
		while (!st.empty() and arr[i] >= st.top()) st.pop();
		if (st.size() == 0) ans[i] = -1;
		else ans[i] = st.top();
		st.push(arr[i]);
	}
	return ans;
}

int solve() {
	int n;
	cin >> n;
	vector<int> arr(n);
	for (int i = 0; i < arr.size(); i++) {cin >> arr[i];}
	vector<int> ans = Smallestonleft(arr, n);
	for (auto i : ans)
		cout << i << endl;
	cout << endl;

}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}