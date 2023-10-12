#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Admin{
private:
    string adminName,adminPassword;
    static int adminCount;

    Admin() : adminName(""), adminPassword("") {};
    Admin(string adminName,string adminPassword) : adminName(adminName), 
    adminPassword(adminPassword) {};
    
public:

    void showAdmin(){
        cout<<"Name : "<<adminName<<endl;
        cout<<"Password : "<<adminPassword<<endl;
    }

    static Admin* getInstance(){
        adminCount++;
        if(adminCount == 1){
            Admin *ptr = new  Admin("vishal","allu le lo");        
            return ptr;        
        }else return nullptr;
    }

    ~Admin() {};
};

// Admin::adminCount = 0; i have forgot int
int Admin::adminCount = 0;

void solve(){
    Admin *p = Admin::getInstance();
    p->showAdmin();

    Admin *another = Admin::getInstance();
    if(another == nullptr) cout<<"No more class object can be intiated"<<endl;
    else cout<<"Object created"<<endl;
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   