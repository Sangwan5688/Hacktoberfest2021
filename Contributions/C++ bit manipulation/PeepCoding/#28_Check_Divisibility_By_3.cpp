/*
    TODO: Check Divisibility By 3
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/check-divisibility-by-3-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
    string s;
    cin>>s;

    int no1 = 0,no2 = 0,n = s.size();
    for(int i= n-1;i>=0;i--){
        if((n - (i+1))&1) if(s[n - (i+1)] - '0') no1++;
        else if(s[i] - '0') no2++;
    }

    if(abs(no1 - no2)%11 == 0) cout<<"true"<<endl;
    else cout<<"false"<<endl;
}

// ! one test case wrong
void solve() {
    string s;
    cin>>s;

    int no = 0,n = s.size();
    for(int i=s.size()-1;i>=0;i--) 
        no+=(s[i]-'0')*pow(2,n-(i+1));

    int om = 0x55555555;
    int em = 0xAAAAAAAA;

    int no1 = no & om;
    int no2 = no & em;

    int cnt1 = 0 ,cnt2 = 0;
    while(no1){
        int rmsb = no1 & -no1;
        no1 -= rmsb;
        cnt1++;
    }

    while(no2){
        int rmsb = no2 & -no2;
        no2 -= rmsb;
        cnt2++;
    }

    if(abs(cnt1 - cnt2)%11 == 0) cout<<"true"<<endl;
    else cout<<"false"<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}