#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

/* Primitive type to class type */

class Complex{
private:
    int a,b;
public:
    Complex() : a(0), b(0) {};
    Complex(int a,int b) : a(a), b(b) {};
    Complex(int n){ a = n, b = 0; } // primitive type to class type

    void showData(){ cout<<a<<" "<<b<<endl; }

    ~Complex() {};
};

void solve(){
    Complex c(4,5);
    c.showData(); // 4 5

    int n = 10;
    Complex c1 = n;
    c1.showData(); // 10 0
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   