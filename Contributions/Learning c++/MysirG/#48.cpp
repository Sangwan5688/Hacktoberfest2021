#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

void solve(){
    {
        cout<<"Program start"<<endl;
        try {
            int a = 5 ,b = 0;
            // cin>>a>>b;
            if(b == 0) throw b;
            else cout<<a+b<<endl;
        } catch (int e) {
            cout<<"We are in catch : e = "<<e<<endl;
        }
        cout<<"Program end normally"<<endl;
    }
    {
        cout<<"Program start"<<endl;
        try {
            int b;
            cin>>b;
            if(b == 0) throw 0;
            else if(b == 1) throw 1.32;
            else if(b == 2) throw 'a';
            else cout<<b*b<<endl;
        } catch (...) {
            cout<<"generic catch"<<endl;
        }
        cout<<"Program end normally"<<endl;
    }
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   