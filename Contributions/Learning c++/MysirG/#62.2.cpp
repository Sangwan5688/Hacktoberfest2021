#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Admin{
private:
    string adminName,adminPassword;

    Admin() : adminName(""), adminPassword("") {};
    Admin(string adminName,string adminPassword) : adminName(adminName), 
    adminPassword(adminPassword) {};
    
public:

    void showAdmin(){
        cout<<"Name : "<<adminName<<endl;
        cout<<"Password : "<<adminPassword<<endl;
    }

    static Admin* getInstance(){
        Admin *ptr = new  Admin("vishal","allu le lo");        
        return ptr;
    }

    ~Admin() {};
};

void solve(){
    Admin *p = Admin::getInstance();
    p->showAdmin();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   