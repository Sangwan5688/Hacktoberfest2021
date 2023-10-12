/*
    TODO: Sum Of Bit Differences Of All Pairs
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/sum-of-bit-differences-of-all-pairs-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
    int n;
    cin>>n;
    vector<int> v(n);
    for(int i=0;i<v.size();i++){cin>>v[i];}
    
    int ans = 0;
    vector<int> set(32,0);
    for(int i=0;i<n;i++) 
        for(int j=30;j>=0;j--) 
            if(v[i] & (1ll << j)) set[j]++;

    for(auto i : set){
        ans += (n - i)*i;
    }

    cout<<2*ans<<endl;
}

// ? TLE
void solve() {
    int n;
    cin>>n;
    vector<int> v(n);
    for(int i=0;i<v.size();i++){cin>>v[i];}
    
    int ans = 0;
    
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            int xo = v[i] ^ v[j];
            while(xo){
                int rmsb = xo & -xo;
                xo -= rmsb;
                ans++;
            }
        }
    }

    cout<<2*ans<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}