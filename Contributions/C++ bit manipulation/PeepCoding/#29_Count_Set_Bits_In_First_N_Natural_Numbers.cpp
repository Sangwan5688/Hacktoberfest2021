/*
    TODO: Count Set Bits In First N Natural Numbers
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/count-setbits-in-first-n-natural-numbers-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;


// ! optimal  [ largest power closet to number -> n*2^(n-1) + (n - 2^n + 1) + f(x) ]
void solve() {
    int n,ans = 0;
    cin>>n;

    int power = 1,cnt = 0;
    while(power *2 <= n){
        power *= 2;
        cnt++;
    }
    ans += ((cnt*power)/2) + (n - power + 1);
    n -= power;
    for(int i=0;i<=n;i++){
        int no = i;
        while(no){
            int rmsb = no & -no;
            no -= rmsb;
            ans++;
        }
    }
    cout<<ans<<endl;
}


// ? comming
void solve() {
    int n,ans = 0;
    cin>>n;

    int power = 1,cnt = 0;
    while(power *2 <= n){
        power *= 2;
        cnt++;
    }
    ans += ((cnt*power)/2);
    for(int i=power+1;i<=n;i++){
        int no = i;
        while(no){
            int rmsb = no & -no;
            no -= rmsb;
            ans++;
        }
    }
    cout<<ans+1<<endl;
}

// ? Brute
void solve() {
    int n,ans = 0;
    cin>>n;

    for(int i=0;i<=n;i++){
        int no = i;
        while(no){
            int rmsb = no & -no;
            no -= rmsb;
            ans++;
        }
    }
    cout<<ans<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}