#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
public:
    Complex() : a(0), b(0) { };
    Complex(int val1) : a(val1), b(0) { };
    Complex(int val1,int val2) : a(val1), b(val2) { };

    void showData(){
        cout<<a<<" "<<b<<endl;
    }

    Complex(Complex &c){ // copy constructor imp to pass by refrence
        a =  c.a;
        b = c.b;
    }

    ~Complex() {} ;
};

void solve(){
    Complex c1,c2(5),c3(3,5);

    c2 = c3;            // copy constructor call
    Complex c4 = c3;    // copy constructor call
    Complex c5(c3);     // copy constructor call

    c4.showData();
    c2.showData();
    c4.showData();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   