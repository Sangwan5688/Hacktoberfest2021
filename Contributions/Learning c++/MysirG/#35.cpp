#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class A{
public:
    A() {};

    void f1(){ cout<<"F1 - class A"<<endl; }
    virtual void f2(){ cout<<"F2 - class A"<<endl; }
    virtual void f3(){ cout<<"F3 - class A"<<endl; }
    virtual void f4(){ cout<<"F4 - class A"<<endl; }

    ~A() {};
};

class B:public A{
public:
    B() {};

    void f1(){ cout<<"F1 - class B"<<endl; } // overidding
    void f2(){ cout<<"F2 - class B"<<endl; } // overidding - virtual
    void f4(int x){ cout<<"F4 - class B : x = "<<x<<endl; } // hidding

    ~B() {};
};

void solve(){ 
    cout<< sizeof(A)<<endl;

    A *ptr, obj1;
    ptr = &obj1;

    // pointer is of type class A , so it will search from class a
    ptr->f1();      // F1 - class A
    ptr->f2();      // F2 - class A 👏
    ptr->f3();      // F3 - class A
    ptr->f4();      // F4 - class A
    // ptr->f4(5); error    👏

    B obj2;
    ptr = &obj2;
    ptr->f1();      // F1 - class A
    ptr->f2();      // F2 - class B
    ptr->f3();      // F3 - class A
    ptr->f4();      // F4 - class A
    // ptr->f4(5); error    👏
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   