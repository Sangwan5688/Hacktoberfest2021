#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Car{
private: 
    string name;
    float model;
public:
    Car() : name("Range Rover"), model(1.012) {
        cout<<"Constructor"<<endl;
    };

    void showData(){
        cout<<name<<" "<<model<<endl;
    }

    void* operator new(size_t size){
        cout<<"new operator overload"<<endl;
        void *p = malloc(size);
        return p;
    }

    void operator delete(void *ptr){
        cout<<"delete operator overload"<<endl;
        free(ptr);
    }

    ~Car() {
        cout<<"Destructor"<<endl;
    };    
};

void solve(){ 
    Car *c = new Car();
    c->showData();
    delete c;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   