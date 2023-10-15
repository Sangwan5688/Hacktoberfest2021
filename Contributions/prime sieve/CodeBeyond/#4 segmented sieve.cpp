#include "bits/stdc++.h"
using namespace std;

#define int        long long

int N = 1e6;
vector<int> sieve(N+1);

void createSieve(){
    for(int i=2;i<=N;i++) sieve[i] = true;

    for(int i=2;i*i<=N;i++){
        if(sieve[i]){
            for(int j=i*i;j<=N;j+=i){
                sieve[j] = false;
            }
        }
    }
}

vector<int> generatePrimes(int N){
    vector<int> ds;
    for(int i=2;i<=N;i++){
        if(sieve[i]) ds.push_back(i);
    }
    return ds;
}


void solve(){
    int l,r;
    cin>>l>>r;

    // generate all prime till sqrt(n)
    vector<int> primes = generatePrimes(sqrt(r));

    // create a dummy array of size l + r - 1 and make everyone as 1
    int n = r-l+1;
    vector<int> dummy(n);
    for(int i=0;i<n;i++) dummy[i] = 1;

    // for all prime number marks its multiple as false
    for(auto pr : primes){

        int firstMultiple = (l/pr)*pr;
        if(firstMultiple < l)  firstMultiple = firstMultiple + pr;

        for(int j=max(firstMultiple,pr*pr);j<=r;j+=pr){
            dummy[j-l] = 0;
        }
    }

    // get all the primes 
    for(int i=l;i<=r;i++){
        if(dummy[i-l] == 1 and i != 1) cout<<i<<endl;
    }
    cout<<endl;
}

signed main(){
  int t = 1;
  cin>>t;

  createSieve();

  while(t--) solve();
  return 0;
}