#include "bits/stdc++.h"
using namespace std;

struct Complex{
private:
    int x,y;
public:
    Complex(int a,int b) : x(a), y(b){ }
    void setData(int a,int b){ x = a,y = b; }
    void showData(){ cout<<x<<" "<<y<<endl; }
};

class Complex2{
private:
    int x,y;
public:
    Complex2(int a, int b) : x(a), y(b) { }
    // Complex2(int a, int b){ x = a, y = b; };
    void showData();
};

void Complex2::showData(){
    cout<<x<<" "<<y<<endl;
}

void solve(){
    Complex c1(23,343);
    // c1.setData(1,2);
    c1.showData();

    Complex2 c(3453453,234234);
    c.showData();

}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}