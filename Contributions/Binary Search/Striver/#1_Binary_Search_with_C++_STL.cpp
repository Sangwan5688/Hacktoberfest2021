/* 
    TODO: Binary Search with C++ STL
 */

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve() {
    vector<int> arr = {1,4,4,4,9,9,10,11};
    
    //? Find first occurence of a X in a sorted Array. if it does ~ exists (-1)
    int ind = lower_bound(arr.begin(), arr.end(),4) - arr.begin();

    if(ind < arr.size() and arr[ind] == 4) cout<<ind<<endl;
    else cout<<-1<<endl;

    //? Find last occurence of a X in a sorted Array. if it does ~ exists (-1)
    ind = upper_bound(arr.begin(), arr.end(),4) - arr.begin();

    if(ind-1 >= 0 and arr[ind-1] == 4) cout<<ind-1<<endl;
    else cout<<-1<<endl;

    //? Find largest number smaller than X in a sorted array. If ~ # exists (-1)
    ind = lower_bound(arr.begin(), arr.end(),11) - arr.begin();

    if(ind - 1 >= 0) cout<<ind-1<<endl;
    else cout<<-1<<endl;

    //? Find smallest number greater than X in sorted array. If ~ # exists (-1)
    ind = upper_bound(arr.begin(), arr.end(),9) - arr.begin();

    if(ind < arr.size()) cout<<ind<<endl;
    else cout<<-1<<endl;
}

void basic(){
    vector<int> arr = {1,4,5,8,9};

    //? Check if x exists in sorted array or not ?
    bool res = binary_search(arr.begin(), arr.end(),3);
    cout<<res<<endl;

    res = binary_search(arr.begin(), arr.end(),4);
    cout<<res<<endl;

    //? Lower Bound function 
    int ind = lower_bound(arr.begin(), arr.end(),8) - arr.begin();
    cout<<ind<<endl;

    ind = lower_bound(arr.begin(), arr.end(),3) - arr.begin();
    cout<<ind<<endl;

    ind = lower_bound(arr.begin(), arr.end(),10) - arr.begin();
    cout<<ind<<endl;


    //? Upper Bound function
    ind = upper_bound(arr.begin(), arr.end(),4) - arr.begin();
    cout<<ind<<endl;

    ind = upper_bound(arr.begin(), arr.end(),7) - arr.begin();
    cout<<ind<<endl;

    ind = upper_bound(arr.begin(), arr.end(),10) - arr.begin();
    cout<<ind<<endl;


    solve();
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;  
    while (t--) basic();
    return 0;
}