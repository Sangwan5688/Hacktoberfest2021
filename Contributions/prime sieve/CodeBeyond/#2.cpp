#include "bits/stdc++.h"
using namespace std;

#define int 		long long int 

int N = 1e6;
vector<int> sieve(N+1);

void createSieve(){
	for(int i=2;i<=N;i++) sieve[i] = 1;

	for(int i=2;i*i<=N;i++){
		if(sieve[i]){
			for(int j=i*i;j<=N;j+=i){
				if(sieve[j] != 0){
					sieve[j] = 0;
					sieve[i]++; 
				}
			}
		}
	}

}

void solve(){
	int n;
	cin>>n;
	cout<<sieve[n]<<endl;
}

signed main(){
	int t =1;
	cin>>t;

	createSieve();
	
	while(t--) solve();
	return 0;
}