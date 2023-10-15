#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

/* 
    Moto
        Member function of one class can become friend of another class
*/

class B;
class A;

class A{
private:
    double pi = 3.14251;
public:
    A() {};

    void showData(B obj2){
        cout<<pi<<endl;
    }

    ~A() {};
};

class B{
private:
    int b = 2.14;
public:
    B() {};

    friend void A::showData(B);

    ~B() {};
};


void solve(){
    A obj1;
    B obj2;
    obj1.showData(B);
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   