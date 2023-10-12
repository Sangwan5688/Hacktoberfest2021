#include "bits/stdc++.h"
using namespace std;

class Complex{
private:
    int x,y;
public:
    Complex() : x(0), y(0) {}
    Complex(int a, int b) : x(a), y(b) { }
    // Complex(int a, int b){ x = a, y = b; };
    void showData();

    Complex add(Complex c){
        Complex temp;
        temp.x = x + c.x;
        temp.y = y + c.y;
        return temp;
    }

};

void Complex::showData(){
    cout<<x<<" "<<y<<endl;
}

void solve(){
    Complex c1(1,1),c2(2,2);
    c1 = c1.add(c2);
    c1.showData();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}