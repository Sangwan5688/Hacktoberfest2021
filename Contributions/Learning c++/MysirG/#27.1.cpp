#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class A{
private:
    int a = 9999;
public:
    A() {};

    void showData(){ cout<<a<<endl; }

    ~A() {};
};

class B:public A{
private:
    string name  = "vishal";
public:
    B() {
        cout<<name<<endl;
        showData();
    };

    ~B() {};
};


void solve(){
    B obj;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   