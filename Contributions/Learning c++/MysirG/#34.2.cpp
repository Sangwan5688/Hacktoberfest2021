#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class A{
public:
    A() {};

    virtual void f1(){
        cout<<"class A function f1"<<endl;
    }

    ~A() {};
};

class B:public A{
public:
    B() {};

    void f1(){ // overidding
        cout<<"class B function f1"<<endl;
    }

    ~B() {};
};

void solve(){ 
    A *obj,obj1;
    B obj2;
    obj = &obj1;
    obj = &obj2;
    obj->f1(); // class B function f1
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   