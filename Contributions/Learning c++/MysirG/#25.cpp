#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
public:
    Complex() : a(0), b(0) { };
    Complex(int a1,int b1) : a(a1), b(b1) { };

    friend ostream& operator<<(ostream&,Complex);
    friend istream& operator>>(istream&,Complex&);
    
    void showData(){ cout<<a<<" "<<b<<endl; }
    ~Complex() { }; 
};

// don't pass any refrence

ostream& operator<<(ostream& dout,Complex c){ // >> wrong indicating
    // cout<<c.a<<" "<<c.b<<endl;              both are same
    dout<<c.a<<" "<<c.b<<endl;
    return dout;
}

istream& operator>>(istream& din,Complex& c){
    // cin>>c.a>>c.b;                           both are same
    din>>c.a>>c.b;
    return din;
}

void solve(){
    Complex c1;
    cout<<"Enter value of Complex c1"<<endl;
    cin>>c1;
    cout<<c1;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   