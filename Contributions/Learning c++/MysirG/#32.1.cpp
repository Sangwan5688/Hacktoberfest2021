#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Car{
private: 
    string name;
    float model;
public:
    Car() : name("Range Rover"), model(1.012) {};

    void showData(){
        cout<<name<<" "<<model<<endl;
    }

    ~Car() {};    
};

void solve(){ 
    Car *c = new Car();
    c->showData();

    int *ptr1 = new int;
    float *ptr2 = new float;
    int *ptr = new int[10];

    for(int i=0;i<10;i++){
        *(ptr + i) = i;
        cout<<*(ptr + i)<<endl;
    }

    delete[] ptr;
    delete c, ptr1, ptr2;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   