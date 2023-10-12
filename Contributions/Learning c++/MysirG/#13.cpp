#include "bits/stdc++.h"
using namespace std;

class Account{
private:
    int balance;
    static float intrest;
public:
    Account() : balance(0) {};
    Account(int cash) : balance(cash) {};

    void showInterest(){
        cout<<intrest<<endl;
    }

    void setInterest(float val){
        intrest = val;
    }
    // ~Account();
};

float Account::intrest = 1.005;

void solve(){
    Account a(10000);
    a.showInterest();
    a.setInterest(4.5f);
    a.showInterest();
    
    static int y;
    cout<<y<<endl;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   