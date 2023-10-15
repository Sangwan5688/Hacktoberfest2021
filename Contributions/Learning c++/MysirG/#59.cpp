#include "bits/stdc++.h"
using namespace std;

#define int    long long int 
#define print(ls)   while(itr != ls.end()){ cout<<*itr<<" "; itr++; }

void solve(){
    list<int> ls = {1,2,3,4,5,6,7,8,9,0};
    list<string> ls1 = {"vishal","Jhonathan","zGod","Ajju Bhai"};

    // no operator []
    ls.sort();
    auto itr = ls.begin(); // list<int>::iterator itr = ls.begin();
    print(ls); cout<<endl;

    cout<<"Size of list : "<<ls1.size()<<endl;
    cout<<"Push Front in list : "<<endl;    
    ls.push_front(-5);
    itr = ls.begin(); print(ls); cout<<endl;

    cout<<"Push Back in list : "<<endl;     
    ls.push_back(15);
    itr = ls.begin(); print(ls); cout<<endl;

    cout<<"Pop Back in list : "<<endl;      
    ls.pop_back();
    itr = ls.begin(); print(ls); cout<<endl;

    cout<<"Pop Front in list : "<<endl;     
    ls.pop_front();
    itr = ls.begin(); print(ls); cout<<endl;

    cout<<"Reverse in list : "<<endl;     
    ls.reverse();
    itr = ls.begin(); print(ls); cout<<endl;

    cout<<"Remove in list : "<<endl;     
    ls.remove(8);
    itr = ls.begin(); print(ls); cout<<endl;    
    ls.remove(8); // Element don't exists
    itr = ls.begin(); print(ls); cout<<endl;  

    cout<<"Clear in list : "<<endl;     
    ls.clear();
    itr = ls.begin(); print(ls); cout<<endl;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   