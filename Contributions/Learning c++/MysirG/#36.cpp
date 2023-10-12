#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

/*
    Template - function, class
*/

template<typename x> 
x add(x a, x b){
    return a + b;
}

template<typename x,typename y> 
x sub(x a, y b){
    return a - b;
}

void solve(){ 
    cout<<add(5,3)<<endl;               // 8
    cout<<add(5.01,3.034)<<endl;        // 8.044

    cout<<sub(5,3.21)<<endl;            // 1
    cout<<sub(3.21,1)<<endl;            // 2.21
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   