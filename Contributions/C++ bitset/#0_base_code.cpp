#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
    bitset<64> bt(20);                  //? 010100
    bitset<M> bset3(string("1100"));    //? 001100
    bt.count();
    for(int i=0;i<bt.size();i++) 
        cout<<bt.test(i)<<" "; cout<<endl;
    bt.any();                           //? returns true, if atleast 1 bit
    bt.none();                          //? returns true, if none of the bit
    bt.set()                            //? sets all bits
    bt.set(4, 0)                        //? makes bset[pos] = b
    bt.set(4)                           //? makes bset[pos] = 1
    bt.reset()                          //? makes all bits 0
    bt.flip()                           //? flips all bits

    //! Converting decimal number to binary by using bitset
    bitset<32>(num)


    //! relational operator
    //* ==, !=, ^=, &=, |=, <<=, >>=, ~, &, |, ^
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}