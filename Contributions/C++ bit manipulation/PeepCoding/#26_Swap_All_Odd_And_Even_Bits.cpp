/*
    TODO: Swap All Odd And Even Bits
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/swap-all-odd-and-even-bits-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
    int n;
    cin>>n;
    
    int odd = 0b01010101010101010101010101010101;
    int even = 0b10101010101010101010101010101010;

    int odd = 0x55555555;
    int even = 0xAAAAAAAA;

    // 1010 -> 10

    int no1 = ((odd&n)<<1);
    int no2 = ((even&n)>>1);
    // cout<<no1<<" "<<no2<<endl;
    cout<<no1 + no2<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}