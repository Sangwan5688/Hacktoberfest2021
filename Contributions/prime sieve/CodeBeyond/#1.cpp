#include "bits/stdc++.h"
using namespace std;

#define int        long long

// int N = 7368787;
int N = 86028121;
vector<bool> sieve(N);
vector<int> ds;

// https://www.spoj.com/problems/TDKPRIME/

void createSieve(){
  for(int i=2;i<=N;i++){
    sieve[i] = true;
  }
  for(int i=2;i*i<=N;i++){
    if(sieve[i]){
      for(int j=i*i;j<=N;j+=i){
        sieve[j] = false;
      }
    }
  }

  for(int i = 2;i<=N;i++){
    if(sieve[i]) ds.push_back(i);
  }

  // what is the limit of the kth prime that we are searching
  // int limit = 5*1e5,cnt = 0,ind = 0;
  // for(int i=2;;i++){
  //   if(sieve[i]) cnt++;
  //   if(cnt == limit){
  //     ind = i;
  //     cout<<ind<<" "<<cnt<<" "<<limit<<" "<<i<<endl;
  //     break;
  //   }
  // }

  // cout<<ind<<endl;
}


void solve(){ 
  int n;
  cin>>n;
  cout<<ds[n-1]<<endl;
}


signed main(){
  int t = 1;
  cin>>t;

  createSieve();

  while(t--) solve();
  return 0;
}