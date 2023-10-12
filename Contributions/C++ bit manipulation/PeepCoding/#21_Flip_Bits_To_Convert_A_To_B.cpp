/*
    TODO: Flip Bits To Convert A To B
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/flip-bits-to-convert-a-to-b-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

// ! optimal
void solve(){
    int ans = 0, a, b;
    cin>>a>>b;
    
    int f = a ^ b;
    while(f){
        int rmsb = f & -f;
        ans++;
        f -= rmsb;
    }
    cout<<ans<<endl;
}

// ? Brute
void solve(){
    int a,b,ans = 0;
    cin>>a>>b;

    while(a and b){
        if( ((a&1) and !(b&1)) or (!(a&1) and (b&1))) ans++;
        // cout<<(a&1)<<" "<<(b&1)<<endl;
        a >>= 1,b >>= 1;
    }

    while(b){
        if(b&1) ans++;
        b >>= 1;
    }
    while(a){
        if(a&1) ans++;
        a >>= 1;
    }

    cout<<ans<<endl;
}

signed main(){
    ios_base::sync_with_stdio(false);cin.tie(NULL);
    int t = 1;
    // cin>>t;
    while(t--) solve();
    return 0;
}