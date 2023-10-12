#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Studnet{
private:
    string name;
    int age;
public:
    Studnet() : name(""), age(0) {};
    Studnet(string name,int age) : name(name), age(age) {};

    void showData(){ cout<<"Name : "<<name<<" "<<"Age : "<<age<<endl; }

    ~Studnet() {};
};

void solve(){
    {
        pair<string, int> pr = {"vishal",19};
        pair<string, string> pr1 = {"vishal","Buddha"};
        pair<string, float> pr2 = {"vishal",19.888};

        Studnet s("vishal",19);
        pair<int, Studnet> pr3 = {1,s};

        cout<<pr3.first<<" ";
        Studnet s1 = (pr3.second); 
        // 🔥 not access py pr3.sc.fr or (pr3.sc).setData()
        s1.showData();
    }
    {
        /* 
            compare two pairs
                ==, !=, <, >, >=, <=    
            these are used in sorting when comparing pair
        */
    }
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   