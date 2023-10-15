
/*
    TODO: Index of first 1 in a sorted array of 0s and 1s
    ? https://practice.geeksforgeeks.org/problems/index-of-first-1-in-a-sorted-array-of-0s-and-1s4048/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
    public:
    int firstIndex(int a[], int n) {
        int low = 0, high = n-1;
        while(low <= high) {
            int mid = low + ((high - low) >> 1);
            if(a[mid] >= 1) {
                high = mid-1;
            } else low = mid+1;
        }
        if(low >= n) return -1;
        return low;
    }
};