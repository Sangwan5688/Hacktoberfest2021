/*
    TODO: Binary Search on Reverse Sorted Array
    ? 
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve(){
    vector<int> arr = {1,2,3,4,5,6,7,8,9,10};
    reverse(arr.begin(), arr.end());

    int no;
    cin>>no;

    int low = 0, high = arr.size()-1;
    while(low <= high) {
        int mid = low + ((high - low) >> 1);

        if(arr[mid] == no) {
            cout<<mid<<endl;
            return;
        } else if(arr[mid] < no) high = mid-1;
        else low = mid+1;
    }

    cout<<"Element ~'t found"<<endl;

}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    cin >> t;
    while (t--) solve();
    return 0;
}