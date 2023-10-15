#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Car{
private:
    int gear;
public:
    Car() : gear(0) {};

    void incrementGear(){
        if(gear < 5) gear++;
    }

    void showValue(){ cout<< gear<< endl; }

    ~Car(){};
};

class SportCar:public Car{
public:
    SportCar(){};

    void changeGear(){
        incrementGear();
        incrementGear();
    }

    void showData(){ showValue(); }

    ~SportCar(){};
};

void solve(){ 
    SportCar c;
    // c.incrementGear();  1
    c.changeGear(); // 2
    c.showData();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   