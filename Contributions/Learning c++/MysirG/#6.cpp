#include "bits/stdc++.h"
using namespace std;

int area(int a,int b){ return a*b; }

float area(int r){ return 3.14*r*r; }

void solve(){
    int a = 5 , b  = 6, c = 10;

    // don't use default argument in function overloading

    // Exact Match
    cout<<area(a,b)<<endl;
    cout<<area(5.0)<<endl;

    // pormotion
    cout<<area(a)<<endl;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}