/*
    TODO: All Repeating Except Two
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/all-repeating-except-two-official/ojquestion
*/
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve(){
    int n,xo = 0;
    cin>>n;
    vector<int> v(n);
    for(int i=0;i<v.size();i++){cin>>v[i];xo ^= v[i];}
    
    int rmsb = xo & -xo;

    int ans1 = 0,ans2 = 0;
    for(int i=0;i<v.size();i++){
        if(v[i]&rmsb) ans1 ^= v[i];
        else ans2 ^= v[i];
    }

    if(ans1 <= ans2) cout<<ans1<<endl<<ans2<<endl;
    else cout<<ans2<<endl<<ans1<<endl;
}

signed main(){
    ios_base::sync_with_stdio(false);cin.tie(NULL);
    int t = 1;
    // cin>>t;
    while(t--) solve();
    return 0;
}