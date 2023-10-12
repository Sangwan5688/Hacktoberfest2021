/*
    TODO: knapSack no
    ? you are given N <= 1000 each with some weight w[i]. Is there a subset with total weight exactly W ? W <= 1e6


    2 , 3 , 5

    bool can[]
        1 0 0 0 0 0 0 0 0 .. 0
        1 0 1 0 0 0 0 0 0 .. 0 
        1 0 1 1 0 1 0 0 0 .. 0 ( 0 + 3 , 2 + 3)
*/
 
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
    int n, W;
    cin>>n>>W;
    can[0] = true;
    for(int id =0;id<n;id++){
        int x;
        cin>>x;
        can = can | (can << x);
    }
    cout<<(can[W] ? "YES" : "~")<<endl;
}

bool can[1e6+5];
void solve1() {
    int n, W;
    cin>>n>>W;
    can[0] = true;
    for(int id =0;id<n;id++){
        int x;
        cin>>x;
        for(int i=W;i>=x;i--){
            if(can[i-x]) can[i] = true;
        }
    }
    cout<<(can[W] ? "YES" : "~")<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}