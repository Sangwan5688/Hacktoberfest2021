#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

// single inheritance
class A{
private:
    int a;
protected:
    // void setValue(int data)      method overridding
    void setValue(int data){ a = data; }

    // void showData()              method overridding
    void showValue(){ cout<<a<<endl; }
public:
    A() {};
    ~A() {};
};

class B:public A{
public:
    void setData(int x){ setValue(x); }
    void showData(){ showValue(); }
    B() {};
    ~B() {};
};

// multilevel inheritance
class A1{
public:
    A1() {};
    ~A1() {};
};

class B1:public A1{
public:
    B1() {};
    ~B1() {};
};

class C1:public B1{
public:
    C1() {};
    ~C1() {};
};

// multifple inheritance
class A3{
public:
    A3() {};
    ~A3() {};
};

class B3{
public:
    B3() {};
    ~B3() {};
};

class C3:public A3,public B3{  // class C3:public A3,:public B3{
public:
    C3() {};
    ~C3() {};
};

// hiearchical inheritance
class A4{
public:
    A4() {};
    ~A4() {};
};

class B4:public A4{
public:
    B4() {};
    ~B4() {};
};

class C4:public A4{
public:
    C4() {};
    ~C4() {};
};

// hybrid inheritance : mixture of two or more types

void solve(){ 
    B obj;
    obj.setData(5);
    obj.showData();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   