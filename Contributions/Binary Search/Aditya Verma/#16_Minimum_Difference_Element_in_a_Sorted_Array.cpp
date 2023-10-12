/*
    TODO: Minimum Difference Element in a Sorted Array
    ? 
*/


#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve(){
    vector<int> nums = {4,6,10};

    int ans = 1e9,key;
    cin>>key;

    int low = 0, high = nums.size()-1;
    while(low <= high) {
        int mid = low + ((high - low) >> 1);
        if(nums[mid] == key) {
            ans = 0;
            break;
        } else if(nums[mid] < key) low = mid+1;
        else high = mid-1;
    }

    if(high >= 0) ans = min(ans,abs(nums[high] - key));

    if(low < nums.size()) ans = min(ans,abs(nums[low] - key));

    cout<<ans<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    cin >> t;
    while (t--) solve();
    return 0;
}
