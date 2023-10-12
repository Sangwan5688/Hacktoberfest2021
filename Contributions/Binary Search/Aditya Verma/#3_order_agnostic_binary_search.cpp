/*
    TODO: order agnostic binary search
    ? 
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve(){
    vector<int> arr = {1,2,3,4,5,6,7,8,9,10};
    reverse(arr.begin(), arr.end());

    int n = arr.size(), no;
    cin>>no;
    bool flag = false;
    if(arr[0] < arr[n-1]) flag = true;
    
    int low = 0, high = n-1;
    while(low <= high) {
        int mid = low + ((high - low)>>1);
        
        if(arr[mid] == no) {
            cout<<mid<<endl;
            return;
        } else if(flag) {
            if(arr[mid] < no) low = mid+1;
            else high = mid-1;
        } else {
            if(arr[mid] < no) high = mid-1;
            else low = mid+1;
        }
    }
    cout<<"Element ~~ found"<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    cin >> t;
    while (t--) solve();
    return 0;
}