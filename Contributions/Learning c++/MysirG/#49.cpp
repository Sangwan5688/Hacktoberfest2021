#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
    int *p;
public:
    Complex() : a(0), b(0) {
        p = new int;
    };
    Complex(int a1,int b1,int c1) : a(a1), b(b1) {
        p = new int;
        *p = c1; // dynamic constructor 
    };
    
    void showData(){ cout<<a<<" "<<b<<endl; }
    ~Complex() { }; 
};

void solve(){
    Complex *ptr = new Complex();
    Complex *ptr1 = new Complex(2,3,4);

    cout<<sizeof(ptr)<<" "<<sizeof(ptr1)<<endl;
    cout<<sizeof(0)<<" "<<sizeof(0.245)<<endl;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   