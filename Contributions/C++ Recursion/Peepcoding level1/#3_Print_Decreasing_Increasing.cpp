/* 
    TODO: Print Decreasing Increasing
 */

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void pre(int n) {
    if(n == 0) {
        n = 1;
        return;
    }
    cout<<n<<endl;
    pre(n-1);
    cout<<n<<endl;
}

bool solve() {
    pre(5);
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;  
    while (t--) solve();
    return 0;
} 