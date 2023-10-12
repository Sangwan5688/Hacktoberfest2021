/*
    TODO: Print Binary And Reverse Bits
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/print-binary-and-reverse-bits-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
    int n;
    cin>>n;

    int no = n;
    vector<int> ans;
    while(no) ans.push_back(no&1), no >>= 1;

    n = 0;
    for(int i=0;i<ans.size();i++) 
        n = n + ans[i]*pow(2,ans.size() - i - 1);

    reverse(ans.begin(), ans.end());
    for(auto i : ans) cout<<i;
    cout<<endl;
    
    cout<<n<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}