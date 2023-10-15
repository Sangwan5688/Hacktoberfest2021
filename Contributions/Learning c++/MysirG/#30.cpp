#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class A{
private:
    int a = -5;
public:
    A() { cout<<"A consturctor"<<endl; };
    A(int x) : a(x) {};

    void showValue(){
        cout<<"A value is : "<<a<<endl<<endl;
    }

    ~A() { cout<<"A destructor"<<endl<<endl; };
};

class B:public A{
private:
    int b;
public:
    B() : b(0), A() { cout<<"B consturctor"<<endl<<endl; };
    B(int x,int y) : b(x), A(y) {};

    void showData(){
        cout<<"B value is : "<<b<<endl;
        showValue();
    }

    ~B() { cout<<"B destructor"<<endl; };
};

void solve(){ 
    B obj;

    B obj1(5,3);
    obj1.showData();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   