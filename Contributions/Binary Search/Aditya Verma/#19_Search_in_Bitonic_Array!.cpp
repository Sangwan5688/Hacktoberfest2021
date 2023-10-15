/*
    TODO: Search in Bitonic Array!
    ? https://www.interviewbit.com/problems/search-in-bitonic-array/
*/


#include "bits/stdc++.h"
using namespace std;

int Solution::solve(vector<int> &arr, int target) {
    int n = arr.size(), low = 0, high = arr.size()-1,ans;
    while(low <= high) {
        int mid = low + ((high - low)>>1);
        
        int next = arr[(mid+1)%n];
        int prev = arr[(mid-1+n)%n];
        if(prev < arr[mid] and arr[mid] > next) {
            ans = mid;
            break;
        } else if(arr[mid] < next) low = mid+1;
        else high = mid-1;
    }
    
    low = 0, high = ans;
    while(low <= high) {
        int mid = low + ((high - low)>>1);
        if(arr[mid] == target) return mid;
        else if(arr[mid] < target) low = mid+1;
        else high = mid-1;
    }
        
    low = ans, high = n-1;
    while(low <= high) {
        int mid = low + ((high - low)>>1);
        if(arr[mid] == target) return mid;
        else if(arr[mid] < target) high = mid-1;
        else low = mid+1;
    }   
    
    return -1;
}
