/*
    TODO: Binary Search
    ? https://practice.geeksforgeeks.org/problems/binary-search-1587115620/1
    ? https://leetcode.com/problems/binary-search/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    int binarysearch(int arr[], int n, int k) {
        int low = 0, high = n-1;
        while(low <= high) {
            int mid = low + ((high - low) >> 1);
            //* int mid = low + (high - low)/2;
            //* int mid = (low + high) >> 1;
            if(arr[mid] == k) {
                // cout<<mid<<endl;
                return mid;
            } else if(arr[mid] < k) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};