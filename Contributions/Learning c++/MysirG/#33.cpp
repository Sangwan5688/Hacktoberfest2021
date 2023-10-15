#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class A{
public:
    A() {};

    void shiftGear(){ cout<<"Class A"<<endl; }
    void f1(){ cout<<"F1 function in class A"<<endl; }
    void f2(){ cout<<"F2 function in class A"<<endl; }

    ~A() {};
};

class B:public A{
public:
    B() {};

    void changeGear(){ cout<<"Class B"<<endl; }
    void f1(){ cout<<"F1 function in class B"<<endl; }  // overidding
    void f2(int x){ cout<<"F2 function in class B : "<<x<<endl; } // hidding

    ~B() {};
};

void solve(){ 
    B obj;
    obj.f1(); // F1 function in class B
    obj.f2(5); // F2 function in class B : 5
    // obj.f2();  Error
    obj.shiftGear(); // Class A
    obj.changeGear(); // Class B
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   