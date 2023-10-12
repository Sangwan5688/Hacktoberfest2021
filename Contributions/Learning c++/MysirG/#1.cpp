#include "bits/stdc++.h"
using namespace std;

class box{
public:
    int length,breath,height;
    
    void setDimensions(int l,int b,int h){
        length = l, breath = b, height = h;
    }

    void printDimensions();
};

void box::printDimensions(){
    cout<<"length : "<<length<<endl;
    cout<<"breath : "<<breath<<endl;
    cout<<"height : "<<height<<endl;
}

void solve(){
    auto cube = box();
    // box cube;
    int l,b,h;
    cin>>l>>b>>h;    

    cube.setDimensions(l,b,h);

    cube.printDimensions();
}

int main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}