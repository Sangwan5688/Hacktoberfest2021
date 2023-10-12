#include "bits/stdc++.h"
using namespace std;

int add(int a,int b = 0,int c = 0){
    return a+ b + c;
}

void solve(){
    int a = 5 , b  = 6, c = 10;
    cout<<add(a)<<endl;
    cout<<add(a,b)<<endl;
    cout<<add(a,b,c)<<endl;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}