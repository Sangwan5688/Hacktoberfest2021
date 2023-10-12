#include "bits/stdc++.h"
using namespace std;

#define int    long long int 
#define print(a)   for(auto &i: a){cout<<i<<" ";if(&i == &a.back()) cout<<endl;}

void solve(){
    string name = "vishal Goat";
    string another  = name;

    if(name == another)
        cout<<"Both are Same"<<endl;
    else 
        cout<<"Both are not same"<<endl;

    /*
        OPERATOR
            =, +, +=, ==, !=, <, <=, >, >=, []
    */

    for(auto i : name) cout<<i<<"-"; cout<<endl;

    for (int i = 0; i < name.size(); ++i){
        cout<<name[i]<<" ";
    }cout<<endl;

    cout<<"Conact"<<endl;
    cout<<name + another<<endl;

    cout<<"Taking Input : ";
    cin>>name;
    cout<<name<<endl;

    cout<<"Pop Back : ";
    name.pop_back();
    cout<<name<<endl;

    cout<<"Push Back : ";
    name.push_back('l'); // name = name + 'l'
    cout<<name<<endl;

    cout<<"Assign : "; // assign
    name.assign("Buddha");
    cout<<name<<endl;

    cout<<"Append : "; // append
    name.append(" God");
    cout<<name<<endl;

    cout<<"Insert : "; // insert
    name.insert(0,"God ");
    cout<<name<<endl;    

    cout<<"Replace : "; // Replace
    name.replace(12,14,"--");
    cout<<name<<endl;   

    cout<<"Erase : "; 
    name.erase(name.begin(),name.begin()+3);
    cout<<name<<endl;  

    cout<<"Find dd : "<<name.find("dd")<<endl;
    
    cout<<"rfind a : "<<name.rfind("a")<<endl; 

    cout<<"Compare : "; 
    string aka = "a", ji = "a";
    cout<<aka.compare(ji)<<endl; // smae - 0 else -1

    cout<<"c_str : "; // c_str()
    char arr[20];
    strcpy(arr,name.c_str());
    print(arr);

    cout<<"Size : "<<name.size()<<endl;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   