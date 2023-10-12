/* 
    TODO: Print Zig-Zag
 */

#include "bits/stdc++.h"
using namespace std;

void pre(int n) {
    if(n == 0) return;

    cout<<"Pre "<<n<<endl;
    pre(n-1);
    cout<<"In "<<n<<endl;
    pre(n-1);
    cout<<"Pos "<<n<<endl;
}

void solve(){
    pre(3);
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;  
    while (t--) solve();
    return 0;
} 