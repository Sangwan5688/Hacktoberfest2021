/*
    TODO: Minimum Platforms
    ? https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1
*/
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x) 		cout<<#x<<" : "<<x<<endl;

void solve() {
	int n;
	cin >> n;
	vector<int> arr(n);
	int no = 0;
	for (int i = 0; i < arr.size(); i++) {cin >> arr[i]; no ^= arr[i];}
	cout << no << endl;

}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}