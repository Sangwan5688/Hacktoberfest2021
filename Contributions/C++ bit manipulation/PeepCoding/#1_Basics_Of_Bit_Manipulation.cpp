/*
    TODO: Basics Of Bit Manipulation
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/basics-of-bit-official/ojquestion
*/


#include "bits/stdc++.h"
using namespace std;

void solve(){
   int n,i,j,k,m;
   cin>>n>>i>>j>>k>>m;

   int onmask = (1<<i);
   int offmask = ~(1<<j);
   int togglemask = (1<<k);
   int checkmask = (1<<m);

   cout<<( n | onmask )<<endl;
   cout<<( n & offmask )<<endl;
   cout<<( n ^ togglemask )<<endl;
   cout<<( (n & checkmask) == 0 ? "false" : "true" )<<endl;

}

signed main(){
    ios_base::sync_with_stdio(false);cin.tie(NULL);
    solve();
    return 0;
}