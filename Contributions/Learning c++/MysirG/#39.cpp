#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

// file reading

void solve(){
    ifstream fin;
    char ch;
    fin.open("simple.txt");
    // fin>>ch;
    ch = fin.get();
    while(!fin.eof()){
        cout<<ch;
        // fin>>ch;
        ch = fin.get();
    }
    fin.close();
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   