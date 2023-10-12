#include "bits/stdc++.h"
using namespace std;

#define int    long long int 
/*
    seekg() - if we want to reset the pointer to starting postion of file
*/

void solve(){
    ifstream fin;
    fin.open("sample.txt",ios::app); // vishal don

    int currPos = fin.tellg();
    cout<<currPos<<endl; // 0

    char ch = fin.get();
    currPos = fin.tellg();
    cout<<ch<<" "<<currPos<<endl; // 1

    fin.seekg(0);
    currPos = fin.tellg();
    cout<<currPos<<endl; // 0

    fin.seekg(2,ios_base::cur); // we want to increment the current postion of ptr by 2
    currPos = fin.tellg();
    cout<<currPos<<endl; // 2

    fin.seekg(5,ios_base::beg); // we want to increment the begging postion of ptr by 2
    currPos = fin.tellg();
    cout<<currPos<<endl; // 5

    fin.seekg(-2,ios_base::end); // we want to increment the end postion of ptr by 2
    currPos = fin.tellg();
    ch = fin.get();
    cout<<ch<<" "<<currPos<<endl; // 8
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   