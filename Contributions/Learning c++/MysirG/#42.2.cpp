#include "bits/stdc++.h"
using namespace std;

#define int    long long int 
/*
    seekg() - if we want to reset the pointer to starting postion of file
*/

void solve(){
    ofstream fout;
    fout.open("sample.txt",ios::app|ios::ate); // vishal don

    int curPos = fout.tellp();
    cout<<curPos<<endl; // 0
    fout<<" Happy Diwali Bhai"; // vishal don Happy Diwali Bhai
    curPos = fout.tellp();
    cout<<curPos<<endl; // 18

    fout.seekp(2,ios_base::beg);
    fout<<"---";
    curPos = fout.tellp();
    cout<<curPos<<endl;

    fout.close();
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   