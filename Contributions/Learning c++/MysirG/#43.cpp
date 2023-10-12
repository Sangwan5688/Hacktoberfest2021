#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
    const int pi;
    int &ptr;
public:
    Complex() : pi(3.14), ptr(a), a(5), b(3) {};

    void showData(){
        cout<<ptr<<" "<<a<<endl;
    }

    ~Complex() {};
};

class Complex1{
private:
    int a,b;
    const int pi;
    int &ptr;
public:
    Complex1(int &n) : pi(3.14), ptr(n), a(5), b(3) {};

    void showData(int &n){
        cout<<ptr<<" "<<n<<endl;
        ptr++;
        cout<<ptr<<" "<<n<<endl;
    }

    ~Complex1() {};
};

void solve(){
    Complex c;
    c.showData();

    int k = 999;
    Complex1 cc(k);
    cc.showData(k);
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   