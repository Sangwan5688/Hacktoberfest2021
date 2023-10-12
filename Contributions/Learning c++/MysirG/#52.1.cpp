#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
    int *ptr;
public:
    Complex() : a(0), b(0) {
        ptr = new int;
    };
    Complex(int a1,int b1,int &c1) : a(a1), b(b1) {
        ptr = new int;
        *ptr = c1;
    };
    
    void incrementPtr(){ 
        (*ptr)++;
        // *ptr++; it don't work without ()
    }
    void showData(){ cout<<a<<" "<<b<<" "<<*ptr<<endl; }

    ~Complex() {
        delete ptr;
    }; 
};

void solve(){
    int ref_var = 45;
    Complex c1(3,5,ref_var),c2(7,9,ref_var),c3;
    c1.showData();
    c1.incrementPtr();
    c1.showData();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   