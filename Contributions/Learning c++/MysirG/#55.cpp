#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

void solve(){
    array<int,5> arr = {1,2,3,4,5};

    for(auto i : arr) cout<<i<<" "; cout<<endl;

    cout<<"At : "<<arr.at(2)<<endl;    
    cout<<"[] : "<<arr[2]<<endl;    
    cout<<"Front : "<<arr.front()<<endl;
    cout<<"Back : "<<arr.back()<<endl;

    arr.fill(5);
    for(auto i : arr) cout<<i<<" "; cout<<endl;

    array<int,5> arr1 = {21,32,34,54,65};
    arr.swap(arr1); // size must be same
    for(auto i : arr) cout<<i<<" "; cout<<endl;    
    for(auto i : arr1) cout<<i<<" "; cout<<endl;

    cout<<"Size : "<<arr.size()<<endl;
    
    auto ptr1 = arr.begin(),ptr2 = arr.end();
    ptr2--;
    cout<<"Begin : "<<*ptr1<<endl;
    cout<<"End : "<<*ptr2<<endl;

}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   