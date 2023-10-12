#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
public:
    Complex() : a(0), b(0) { };
    Complex(int a1,int b1) : a(a1), b(b1) { };
        
    friend Complex operator-(Complex);

    void showData(){ cout<<a<<" "<<b<<endl; }
    ~Complex() { }; 
};

Complex operator-(Complex c){
    Complex temp;
    temp.a = -c.a;
    temp.b = -c.b;
    return temp;
}

void solve(){
    Complex c1(3,5),c2(7,9),c3;
    {
        c3 = -c1;
        c3.showData();
    }
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   