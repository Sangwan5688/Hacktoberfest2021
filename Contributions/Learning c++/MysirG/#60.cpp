#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

void solve(){
    map<int, string> mp;
    mp[78] = "striver";
    mp[81] = "vishal";
    mp[99] = "Jhonathan Hacker";
    mp[219] = "Bakru - Goat";

    map<int, string> mp1 = {{78,"striver"},{81,"vishal"},{99,"Jhonathan Hacker"},{219,"Bakru - Goat"}};

    cout<<"At : "<<mp.at(219)<<endl;
    cout<<"[] : "<<mp[219]<<endl;
    cout<<"Size : "<<mp.size()<<endl;
    cout<<"IsEmpty : "<<mp.empty()<<endl; // 🔥
    cout<<"Traverse : "<<endl;
    for(auto i : mp) cout<<i.first<<" "<<i.second<<endl;
    cout<<"Insert : ";
    mp.insert({11,"Buddha"});
    cout<<mp[11]<<endl;
    cout<<"Clear : ";
    mp.clear();
    for(auto i : mp) cout<<i.first<<" "<<i.second<<endl;

}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   