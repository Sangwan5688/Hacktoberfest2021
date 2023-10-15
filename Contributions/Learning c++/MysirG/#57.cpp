#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

void solve(){
    tuple<string,int,int> t = {"--",0,0};
    t = make_tuple("vishal",19,219);
    
    cout<<get<0>(t)<<endl;
    cout<<get<1>(t)<<endl;
    cout<<get<2>(t)<<endl;

    /* 
        compare two pairs
            ==, !=, <, >, >=, <=    
        these are used in sorting when comparing pair
    */

}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   