#include "bits/stdc++.h"
using namespace std;

void solve(){
    int x = 10;

    int *ptr1;
    ptr1 = &x;

    cout<<*ptr1<<" "<<x<<endl;
    cout<<ptr1<<" "<<&x<<endl;


    int &ptr2 = x; // this is python case of refrencing
    x++;

    cout<<ptr2<<" "<<x<<endl;
    cout<<&ptr2<<" "<<&x<<endl;

}

int main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}