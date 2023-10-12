/*
    TODO: Is A Power Of 2
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/is-a-power-of-2-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve(){
    int n;
    cin>>n;

    if(n && !(n&(n-1))) cout<<"true"<<endl;
    else cout<<"false"<<endl;

    if((n&(n-1)) == 0) cout<<"true"<<endl;
    else cout<<"false"<<endl;
}

signed main(){
    ios_base::sync_with_stdio(false);cin.tie(NULL);
    int t = 1;
    // cin>>t;
    while(t--) solve();
    return 0;
}