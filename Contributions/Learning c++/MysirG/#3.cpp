#include "bits/stdc++.h"
using namespace std;

class Solution
{
private:
    int x,y,z;
public:
    // int area(int x){ return x*x*x; } implicity inline
    // C++ compiler cannot perform inlining if the function is virtual.
    int area(int x);
};

inline int Solution::area(int x){ return x*x*x; }

inline area(int r){ return 3.14*r*r; }

void solve(){
    Solution s;
    int r = 10;
    cout<<area(r)<<endl;
    cout<<s.area(r)<<endl;

    //  There are some problems with the use of macros in C++. Macro cannot access private members of class.
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}