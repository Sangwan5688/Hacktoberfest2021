#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
public:
    Complex() : a(0), b(0) { };
    Complex(int a1,int b1) : a(a1), b(b1) { };
    
    void showData(){ cout<<a<<" "<<b<<endl; }
    ~Complex() { }; 
};

void solve(){
    Complex c1(3,5),c2(7,9),c3;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   