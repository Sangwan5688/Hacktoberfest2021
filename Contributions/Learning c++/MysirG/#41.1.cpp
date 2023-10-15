#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

void solve(){
    ifstream fin;
    fin.open("sample.txt");

    int currentPosition = fin.tellg();
    cout<<currentPosition<<endl; // 0

    char ch = fin.get();
    currentPosition = fin.tellg();
    cout<<currentPosition<<endl; // 1

    fin.close();
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   