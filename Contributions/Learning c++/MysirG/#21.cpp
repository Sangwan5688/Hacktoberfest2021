#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Complex{
private:
    int a,b;
public:
    Complex() : a(0), b(0) { };
    Complex(int a1,int b1) : a(a1), b(b1) { };

   // friend void accessingData(); forgot passing parameter
   friend void accessingData(Complex);
    
    void showData(){ cout<<a<<" "<<b<<endl; }
    ~Complex() { }; 
};

// friend void Complex::accessingData(){       writing wrong syntax
// void Complex::accessingData(){              writing wrong syntax
void accessingData(Complex c){
    cout<<"Outside Complex access of private data"<<endl;
    cout<<c.a<<" "<<c.b<<endl;
}

void solve(){
    Complex c1(3,5),c2(7,9),c3;
    accessingData(c1);
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   