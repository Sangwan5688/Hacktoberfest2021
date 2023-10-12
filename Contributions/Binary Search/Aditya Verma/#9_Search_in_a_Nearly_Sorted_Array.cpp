/*
    TODO: Searching in a Nearly Sorted Array
    ? https://www.educative.io/answers/how-to-search-in-a-nearly-sorted-array
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

//! Java
public static int searchInNearlySortedArray(int[] arr, int k) {
    int start = 0;
    int end = arr.length - 1;
    while (start <= end) {
        int mid = start + (end - start) / 2;
        if (arr[mid] == k) {
            return mid;
        } else if (mid - 1 >= start && arr[mid - 1] == k) {
            return mid - 1;
        } else if (mid + 1 <= end && arr[mid + 1] == k) {
            return mid + 1;
        } else if (arr[mid] > k) {
            end = mid - 2;
        } else {
            start = mid + 2;
        }
    }
    return -1;
}

//! C++ 
int solve(){
    vector<int> nums = {5,10,30,20,40};
    int target,n = nums.size();
    cin>>target;

    int low = 0, high = nums.size()-1;
    while(low <= high) {
        int mid = low + ((high - low) >> 1);
        int next = (mid+1)%n;
        int prev = (mid-1+n)%n;

        if(nums[mid] == target) return mid;
        else if(nums[prev] == target) return prev;
        else if(nums[next] == target) return next;
        else {
            vector<int> mp = {nums[prev],nums[mid],nums[next]};
            sort(mp.begin(), mp.end());

            if(mp[1] < target) low = mid+1;
            else high = mid-1;
        }
    }
    now(low);
    now(high);
    return -1;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    cin >> t;
    while (t--) {
        cout<<solve()<<endl;
    }
    return 0;
}