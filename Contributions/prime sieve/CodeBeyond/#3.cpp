// new sieve that was taught
void createSieve(){
    int N;
    cin>>N;
    vector<int> sieve(N+1);
    for (int i=0; i<=N; i++) sieve[i] = i;
    for (int i=2; i*i<=N; i++){
        if (sieve[i] == i){
            for (int j=i*i; j<=N; j+=i)
                if (sieve[j]==j) sieve[j] = i;
        }
    }    
}