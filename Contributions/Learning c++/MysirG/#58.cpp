#include "bits/stdc++.h"
using namespace std;

#define int    long long int 
#define print(a)   for(auto &i: a){cout<<i<<" ";if(&i == &a.back()) cout<<endl;}

void solve(){
    vector<int> arr = {1,2,3,4,5,6,7,8,9}, arr1(4), arr2(5,99);
    vector<string> sarr(4,"vishal");

    cout<<arr[0]<<" "<<arr[1]<<" "<<arr[2]<<endl;

    print(arr);

    int n = 4;
    vector<int> v(n),random;
    for(auto &i :v) cin>>i;

    print(v);

    for (int i = 0; i < 4; ++i)
    {
        int x;
        cin>>x;
        random.push_back(x);
    }
    print(random);

    cout<<random.capacity()<<" "<<random.size()<<endl;

    random.pop_back();
    print(random);

    random.clear();
    cout<<"After clear operation"<<endl;
    print(random);

    cout<<arr[0]<<" "<<arr.at(1)<<endl;

    cout<<arr.front()<<" "<<arr.back()<<endl;

}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   