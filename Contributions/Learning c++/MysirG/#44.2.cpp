#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
    int *ptr;
public:
    // Complex() : a(0), b(0), ptr(nullptr) {};
    Complex() : a(0), b(0) {
        ptr = new int[0];
    };
    // Complex(int a,int b,int &c) : a(a), b(b), *ptr(c) {};
    Complex(int a,int b) : a(a), b(b) {
        ptr = new int[a];
    };
    Complex(Complex &c){ 
        int *ptr = new int[c.a];
        a = c.a,b = c.b;
        if (ptr)
        {
         for (int i = 0; i < c.a; i++)
         {
             ptr[i] = c.ptr[i];
         }
        }
    } 

    void setDataInArray(){
        for(int i=0;i<a;i++){
            cin>>ptr[i];
            cout<<ptr[i]<<" ";
        }cout<<endl;
    }

    void showData(){ cout<<a<<" "<<b<<endl; }

    void addressOfPtr(){
        cout<<(ptr)<<endl;
    }

    ~Complex() {
        delete ptr;
    };
};

void solve(){
    Complex c(4,21);
    c.setDataInArray();

    Complex c1 = c;
    c1.addressOfPtr();
    c.addressOfPtr();
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   