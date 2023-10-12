/*
    TODO: Is A Power Of 4
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/is-a-power-of-4/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

class Solution {
public:
    bool isPowerOfFour(int nn) {
        int n = nn;
        if( (n && !(n & (n-1))) ){
            int cnt = 0;
            n--;
            while(n){
                int rmsb = n & -n;
                n -= rmsb;
                cnt++;
            }
            cout<<cnt<<endl;
            return (cnt%2 == 0);
        }else return false;
    }
};

bool isPowerOfFour(int n) {
	int mask = 0b01010101010101010101010101010101;
	return ((n && !(n & (n - 1))) and (mask & n) );
}

void solve() {
	int n;
	cin >> n;
	cout << (isPowerOfFour(n) ? "true" : "false" ) << endl;
}

signed main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL);
	int t = 1;
	// cin >> t;
	while (t--) solve();
	return 0;
}