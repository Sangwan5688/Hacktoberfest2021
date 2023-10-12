/*
    TODO: Copy Set Bits In A Range
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/copy-set-bits-in-a-range-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

// ? custom mask
void solve(){
    int a,b,l,r;
    cin>>a>>b>>l>>r;

    int len = r - l + 1;
    int mask =(a & (((1<<len) - 1)<<(l-1)) );

    cout<<(b | mask)<<endl;
}

// ? Brute
void solve(){
    int a,b,l,r,len = 0;
    cin>>a>>b>>l>>r;

    vector<int> aa(32,0), bb(32,0);
    int ind = 0;
    while(a){
        if(a&1) aa[ind] = 1;
        a>>=1,ind++;  
    } 
    ind = 0;
    while(b){
        if(b&1) bb[ind] = 1;
        b>>=1,ind++;  
    } 

    for(int i=0;i<aa.size();i++){
        int ii = i+1;
        if(l <= ii and ii <= r){
            bb[i] = bb[i] | (aa[i] & 1);
        }
    }

    int no = 0,i = 0;
    while(i < aa.size()){
        // cout<<bb[i]<<" ";
        if(bb[i]) no += pow(2,i);
        i++;
    }
    // cout<<endl;
    cout<<no<<endl;
}

signed main(){
    ios_base::sync_with_stdio(false);cin.tie(NULL);
    int t = 1;
    // cin>>t;
    while(t--) solve();
    return 0;
}