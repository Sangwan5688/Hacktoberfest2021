#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class A{
private:
    int a = 999;
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
        showData();
    };

    void showData(){
        cout<<"hi"<<endl;
    }

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