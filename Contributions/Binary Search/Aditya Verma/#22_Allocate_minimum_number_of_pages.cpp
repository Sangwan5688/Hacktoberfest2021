/*
    TODO: Allocate minimum number of pages
    ? https://practice.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1
    ! low is imp
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
    public:
    bool isPossible(int arr[], int n, int m, int mid) {
        int cnt = 0, sum = 0;
        for(int i=0;i<n;i++) {
            sum += arr[i];
            if(sum > mid) {
                sum = arr[i];
                if(i == n-1) cnt++;
                cnt++;
            } else if(sum < mid and i == n-1) cnt++;
        }
        return (cnt <= m);
    }
    int findPages(int arr[], int n, int m) {
        if(m > n) return -1;
        
        int sum = 0;
        for(int i=0;i<n;i++) sum += arr[i];
        int low = arr[n-1], high = sum+1, ans = -1;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            if(isPossible(arr,n,m,mid)) {
                ans = mid;
                high = mid-1;
            } else low = mid+1;
        }
        return ans;
    }
};