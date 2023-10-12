#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

/* Class Type to Primitive Type */

class Complex{
private:
    int a,b;
public:
    Complex() : a(0), b(0) {};
    Complex(int a,int b) : a(a), b(b) {};
    Complex(int n){ a = n, b = 0; }

    operator int(){ return (a); } // Class Type to Primitive Type 

    void showData(){ cout<<a<<" "<<b<<endl; }

    ~Complex() {};
};

void solve(){
    Complex c(2,31);
    c.showData(); // 2 31
    int a = c;
    cout<<a<<endl;
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   