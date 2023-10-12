#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
public:
    Complex() : a(0), b(0) { };
    Complex(int a1,int b1) : a(a1), b(b1) { };

    // Complex operator-(Complex c){ my mistake
    //     Complex temp;
    //     temp.a = -c.a;
    //     temp.b = -c.b;
    //     return temp;
    // }

    Complex operator-(){
        Complex temp;
        temp.a = a;
        temp.b = b;
        return temp;
    }

    void showData(){ cout<<a<<" "<<b<<endl; }
    ~Complex() { }; 
};

void solve(){
    Complex c1(3,5),c2(7,9),c3;
    {
        c3 = c2.operator-();
        c3.showData();
    }
    {
        c3 = -c2;
        c3.showData();
    }
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   