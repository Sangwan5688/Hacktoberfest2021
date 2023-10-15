#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

namespace appun_log{
    string name = "vishal";
    int age = 19;
    const float pi = 3.14;

    void HelloWorld();

    class Complex{
    private:
        int a,b;
        int *ptr;
    public:
        Complex() : a(0), b(0) { ptr = new int; };
        Complex(int a1,int b1,int &c1) : a(a1), b(b1) {  
            ptr = new int; 
            *ptr = c1;
        };

        static void watchHardWork(){
            cout<<"I am still grinding 24*7"<<endl;
        }
        
        void showData(){ cout<<a<<" "<<b<<" "<<*ptr<<endl; }
        ~Complex() { }; 
    };
}

namespace al = appun_log;

void al::HelloWorld(){
    cout<<"Welcome To My World Bozz.. "<<endl;
}

void solve(){
    cout<<al::name<<endl;
    cout<<al::age<<endl;
    cout<<al::pi<<endl;

    int n = 4545;
    al::Complex c(3939393,4848484,n);
    // al::Complex c1 = new al::Complex(3,4,n); don't work
    c.showData();

    al::HelloWorld();

    al::Complex::watchHardWork();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   