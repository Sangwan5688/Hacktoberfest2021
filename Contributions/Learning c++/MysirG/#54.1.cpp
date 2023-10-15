#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

/*
    STL - Algorithum
        sort(first_iterator, last_iterator)
        sort(first_iterator, last_iterator, greater<int>())
        reverse(first_iterator, last_iterator)
        *max_element (first_iterator, last_iterator)
        *min_element (first_iterator, last_iterator)
        accumulate(first_iterator, last_iterator, initial value of sum)
        count(first_iterator, last_iterator,x)        
        arr.erase(position to be deleted)
        
        find(first_iterator, last_iterator, x)
        binary_search(first_iterator, last_iterator, x) 
        lower_bound(first_iterator, last_iterator, x)
        upper_bound(first_iterator, last_iterator, x)
        arr.erase(unique(arr.begin(),arr.end()),arr.end()) 
        next_permutation(first_iterator, last_iterator) 
        prev_permutation(first_iterator, last_iterator)
        distance(first_iterator,desired_position)
*/

void solve(){
    vector<int> arr = {1,2,3,4,5,6,7,8,9,9};
    {
        auto itr = find(arr.begin(), arr.end(),4);
        cout<<*itr<<endl;
    }
    {
        auto itr = binary_search(arr.begin(), arr.end(),5);
        if(itr) cout<<"4 is found"<<endl;
        else cout<<"4 is not found"<<endl;

        itr = binary_search(arr.begin(), arr.end(),10);
        if(itr) cout<<"10 is found"<<endl;
        else cout<<"10 is not found"<<endl;        
    }
    {
        auto itr = lower_bound(arr.begin(), arr.end(),6) - arr.begin();
        cout<<itr<<endl;

        itr = upper_bound(arr.begin(), arr.end(),10) - arr.begin();
        cout<<itr<<endl;
    }
    {
        arr.erase(arr.begin());
        for(auto i : arr) cout<<i<<" "; cout<<endl;

        arr.erase(unique(arr.begin(), arr.end()),arr.end());
        for(auto i : arr) cout<<i<<" "; cout<<endl;
    }   
    {   
        next_permutation(arr.begin(), arr.end());
        for(auto i : arr) cout<<i<<" "; cout<<endl;

        prev_permutation(arr.begin(), arr.end());
        for(auto i : arr) cout<<i<<" "; cout<<endl;
    }
    {   
        for(auto i : arr) cout<<i<<" "; cout<<endl;
        auto dist = distance(arr.begin(), max_element(arr.begin(), arr.end()));
        cout<<dist<<" "<<arr[dist]<<endl;
    }
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   