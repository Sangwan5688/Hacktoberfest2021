/*
Problem
You are given a string s[1…n] consisting of lowercase Latin letters. It is guaranteed that n=2k for some integer k≥0.

The string s[1…n] is called c-good if at least one of the following three conditions is satisfied:

The length of s is 1, and it consists of the character c (i.e. s1=c);
The length of s is greater than 1, the first half of the string consists of only the character c (i.e. s1=s2=⋯=sn2=c) and the second half of the string (i.e. the string sn2+1sn2+2…sn) is a (c+1)-good string;
The length of s is greater than 1, the second half of the string consists of only the character c (i.e. sn2+1=sn2+2=⋯=sn=c) and the first half of the string (i.e. the string s1s2…sn2) is a (c+1)-good string.
For example: "aabc" is 'a'-good, "ffgheeee" is 'e'-good.

In one move, you can choose one index i from 1 to n and replace si with any lowercase Latin letter (any character from 'a' to 'z').

Your task is to find the minimum number of moves required to obtain an 'a'-good string from s (i.e. c-good string for c= 'a'). It is guaranteed that the answer always exists.

You have to answer t independent test cases.

Another example of an 'a'-good string is as follows. Consider the string s="cdbbaaaa". It is an 'a'-good string, because:

the second half of the string ("aaaa") consists of only the character 'a';
the first half of the string ("cdbb") is 'b'-good string, because:
the second half of the string ("bb") consists of only the character 'b';
the first half of the string ("cd") is 'c'-good string, because:
the first half of the string ("c") consists of only the character 'c';
the second half of the string ("d") is 'd'-good string.


Input
The first line of the input contains one integer t (1≤t≤2⋅104) — the number of test cases. Then t test cases follow.

The first line of the test case contains one integer n (1≤n≤131 072) — the length of s. It is guaranteed that n=2k for some integer k≥0. The second line of the test case contains the string s consisting of n lowercase Latin letters.

It is guaranteed that the sum of n does not exceed 2⋅105 (∑n≤2⋅105).

Output
For each test case, print the answer — the minimum number of moves required to obtain an 'a'-good string from s (i.e. c-good string with c= 'a'). It is guaranteed that the answer exists.
 */


#include <bits/stdc++.h>
const long long mod = 1e9 + 7;
#define int long long
#define pi pair<int,int>
#define vi vector<int>
#define all(x) begin(x), end(x)
#define sz(x) (int)(x).size()
#define pb push_back
#define mp make_pair
#define FAST_IO ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
#define TIME cerr << "\n" << (float)clock() / CLOCKS_PER_SEC * 1000 << " ms" << endl;
#define inf      1e18
#define endl    "\n"
using namespace std;

const int mx = 1e5 + 5;


int count(string s, char c, int n) {
	if (n == 1) {
		if (s[0] == c) {
			return 0;
		} else {
			return 1;
		}
	}

	string s1 = s.substr(0, n / 2);
	string s2 = s.substr(n / 2, n);

	int n1 = count(s1, c + 1, n / 2);
	int n2 = count(s2, c + 1, n / 2);
	int cnt1 = 0;
	for (int i = 0; i < sz(s1); i++) {
		if (s1[i] == c)cnt1++;
	}
	int cnt2 = 0;
	for (int i = 0; i < sz(s2); i++) {
		if (s2[i] == c)cnt2++;
	}
	return min((sz(s1) - cnt1 + n2), (sz(s2) - cnt2 + n1));

}

void Solve() {
	int n;
	cin >> n;
	string s;
	cin >> s;
	char c = 'a';
	int ans = count(s, c, n);
	cout << ans << endl;

}

int32_t main() {
	FAST_IO
	int TC = 1;
	cin >> TC;
	while (TC--) {
		Solve();
	}
	TIME
}
