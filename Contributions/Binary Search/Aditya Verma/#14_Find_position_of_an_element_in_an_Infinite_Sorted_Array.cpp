/*
    TODO: Find position of an element in an Infinite Sorted Array
    ? 
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

vector<int> nums;

void solve(){
    int target;
    cin>>target;

    int low = 0, high = 1;

    while(high <= target) {
        high = high*2;
    }

    cout<<low<<" "<<high<<endl;


    while(low <= high) {
        int mid = low + ((high - low)>>1);
        if(nums[mid] == target) {
            cout<<mid<<endl;
            return;
        } else if(nums[mid] < target) low = mid+1;
        else high = mid-1;
    }
    cout<<"~'t found"<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    cin >> t;

    for(int i=0;i<1e7;i++) nums.push_back(i);

    while (t--) solve();
    return 0;
}