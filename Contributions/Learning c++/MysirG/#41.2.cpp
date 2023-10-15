#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

// tellp - tell the position of put pointer

void solve(){
    ofstream fout;
    fout.open("sample.txt",ios::app);

    int currentPosition = fout.tellp();
    cout<<currentPosition<<endl; // 0 - end of previous text treated as 0

    fout<<" vishal badmash";
    currentPosition = fout.tellp();
    cout<<currentPosition<<endl; // 15 - total char of " vishal badmash"

    fout.close();
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   