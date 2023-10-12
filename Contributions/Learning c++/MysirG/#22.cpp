#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class B;

class A{
private:
    int a;
public:
    A() : a(0) {};
    A(int data) : a(data) {};
    ~A() {};
    friend void fun(A,B); // b is not declare
};

class B{
private:
    int b;
public:
    B() : b(0) {};
    B(int data) : b(data) {};
    ~B() {};
    friend void fun(A,B);
};

void fun(A a,B b){
    cout<<a.a<<" "<<b.b<<endl;
}

void solve(){
    A c1(5);
    B c2(7);

    fun(c1,c2);
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   