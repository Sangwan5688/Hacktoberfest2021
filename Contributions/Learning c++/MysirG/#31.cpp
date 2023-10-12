#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Box{
private:
    int l,b,h;
public:
    Box() : l(0), b(0), h(0) {};

    void setValue(int l,int b,int h){ this->l = l,this->b = b,this->h = h; }

    void area(){ cout<<"Area is : "<<l*b*h<<endl; }    

    ~Box() {};
};

void solve(){ 
    {
        Box *ptr,smallBox;
        ptr = &smallBox;

        ptr->setValue(5,5,5); //         smallBox.setValue(3,3,3);
        ptr->area(); //                  smallBox.area(); 
    }
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   