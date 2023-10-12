/*
    TODO: Ceil The Floor
    ? https://practice.geeksforgeeks.org/problems/ceil-the-floor2802/1
*/

#include "bits/stdc++.h"
using namespace std;

pair<int, int> getFloorAndCeil(int arr[], int n, int x) {
    sort(arr,arr+n);
    
    pair<int,int> pr = {-1,-1};
    int low = 0, high = n-1, flag = false;;
    while(low <= high) {
        int mid = low + ((high - low)>>1);
        if(arr[mid] == x) {
            pr.first = arr[mid];
            flag = true;
            break;
        } else if(arr[mid] < x) low = mid+1;
        else high = mid-1;
    }
    if(high < 0) pr.first = -1;
    else if(flag == false) pr.first = arr[high];
    
    low = 0, high = n-1;
    while(low <= high) {
        int mid = low + ((high - low)>>1);
        if(arr[mid] == x) {
            pr.second = x;
            low = mid+1;
        } else if(arr[mid] < x) low = mid+1;
        else high = mid-1;
    }
    if(low >= n) pr.second = -1;
    else if(flag == false) pr.second = arr[low];
    
    return pr;
}