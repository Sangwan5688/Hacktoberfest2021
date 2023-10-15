#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

// file writting

void solve(){
    ofstream fout; // object
    fout.open("simple.txt");
    fout<<"Hello world";
    fout.close();
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   