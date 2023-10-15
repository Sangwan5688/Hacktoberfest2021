#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

/*
    Normal Destructor works - 
        calling order           -          child -> parent
        execution order         -          child -> parent
*/

class A{
private:
    int a;
public:
    A() : a(0) {};
    A(int a) : a(a) {};

    void showData(){ cout<<"Value of a : "<<a<<endl; }

    virtual ~A() {}; // both base & child class will become virtual
};

class B:public A{
private:
    int b;
public:
    B() : b(0) {};
    B(int b) : b(b) {};

    void showData(){ cout<<"Value of b : "<<b<<endl; }

    ~B() {};
};

void solve(){
    // A *ptr = new B(5);
    A *ptr;
    B obj(5);
    ptr = &obj;

    ptr->showData(); // Early Binaing - only A class desctructor will be called

    delete ptr;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   