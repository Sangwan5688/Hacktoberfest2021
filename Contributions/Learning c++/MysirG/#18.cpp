#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
public:
    Complex() : a(0), b(0) { };
    Complex(int a1,int b1) : a(a1), b(b1) { };

    Complex operator+(Complex c){ // name can be  Complex operator +(Complex &c){
        Complex temp;
        temp.a = c.a + a;
        temp.b = c.b + b;
        return temp;
    }

    Complex add(Complex c){ // important
        Complex temp;
        temp.a = a + c.a;
        temp.b = b + c.b;
        return temp;
    }

    /* 
        My mistake 
        Complex operator+(Complex c){
            Complex temp(0,0);
            a = c.a + temp.a;
            b = c.b + temp.b;
            return temp;
        }

        Complex add(Complex c){
            Complex temp(0,0);
            a = c.a + temp.a;
            b = c.b + temp.b;
            return temp;
        }
    */

    void showData(){ cout<<a<<" "<<b<<endl; }
    ~Complex() { }; 
};

void solve(){
    Complex c1(3,5),c2(7,9),c3;
    {
        c3 = c1.add(c2);
        c3.showData();
    }
    {
        c3 = c1 + c2;
        c3.showData();
    }
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   