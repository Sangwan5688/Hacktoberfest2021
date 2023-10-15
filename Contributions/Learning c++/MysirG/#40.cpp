#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

/*
    ios::in          input/read             ifstream
    ios::out         output/write           ofstream
    ios::app         append
    ios::ate         update
    ios::binary      binary
    
    fout    ->    cout      ->      write
    fin     ->    cin       ->      read
*/

void solve(){
    ofstream fout;
    fout.open("sample.txt",ios::out);
    // fout.open("sample.txt",ios::out||ios::binary); more than one opening mode
    fout.close();
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   