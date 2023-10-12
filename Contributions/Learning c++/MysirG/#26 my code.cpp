#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

/* 
    Moto
        Member function of one class can become friend of another class
*/

class B;

class A{
private:
    double pi = 3.14251;
public:
    A() {};

    void showData(B& obj2);

    ~A() {};
};

class B{
private:
    int b = 2.14;
    string name  = "vishla";
public:
    B() {};

    friend void A::showData(B& obj2);

    ~B() {};
};

void A::showData(B& obj2){
    cout<<obj2.name<<endl;
}

void solve(){
    A obj1;
    B obj2;
    obj1.showData(obj2);
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   