#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

// file1.cpp
namespace appun_log{
    string name = "vishal";
    const int age = 19;

    class Person{
    private:
        string name;
    public:
        Person() : name("") {};
        Person(string name) : name(name) {};

        void showName(){ cout<<name<<endl; }

        ~Person() {};
    };
}

// file2.cpp
namespace new_appun_log{
    using namespace appun_log;
    namespace al = appun_log;

    string new_name = al::name;
    al::Person p("Tapun");
}

namespace nal = new_appun_log;

void solve(){
    nal::p.showName();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   