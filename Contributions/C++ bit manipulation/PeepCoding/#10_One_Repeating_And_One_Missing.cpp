/*
    TODO: One Repeating And One Missing
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/one-repeating-and-one-missing-official/ojquestion
*/
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve(){
    int n,xo = 0;
    cin>>n;
    vector<int> v(n);
    map<int, int> mp;
    for(int i=0;i<v.size();i++){
        cin>>v[i];
        mp[v[i]]++;
        xo ^= v[i];
        xo ^= (i+1);
    }

    int rmsb = (xo & -xo),ans1 = 0,ans2 = 0;

    for (int i = 1; i <= v.size(); ++i){
        if(rmsb & v[i-1]) ans1 ^= v[i-1];
        else ans2 ^= v[i-1];
    }

    for (int i = 1; i <= n; ++i){
        if(i & rmsb) ans1 ^= i;
        else ans2 ^= i;
    }

    if(mp.find(ans1) == mp.end()){
        cout<<"Missing Number -> "<<ans1<<endl;
        cout<<"Repeating Number -> "<<ans2<<endl;    
    }else{
        cout<<"Missing Number -> "<<ans2<<endl;
        cout<<"Repeating Number -> "<<ans1<<endl;    
    }
    
}

signed main(){
    ios_base::sync_with_stdio(false);cin.tie(NULL);
    int t = 1;
    // cin>>t;
    while(t--) solve();
    return 0;
}