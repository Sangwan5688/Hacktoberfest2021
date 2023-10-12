#include "bits/stdc++.h"
using namespace std;

// call by value
int add(int a,int b){ return a+b; }

// call by address
int add1(int *a,int *b){ return (*a)+(*b); }

// call by refrence
int add2(int &a,int &b){ return a+b; }

void solve(){
    int a = 5 , b  = 6;
    cout<<add(a,b)<<endl;
    cout<<add1(&a,&b)<<endl;
    cout<<add2(a,b)<<endl;

    cout<<a<<" "<<b<<endl; // if we have incremented it then
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}