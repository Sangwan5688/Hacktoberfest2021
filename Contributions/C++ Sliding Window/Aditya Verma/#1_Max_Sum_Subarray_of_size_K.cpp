/*
    TODO: Max Sum Subarray of size K
    ? https://practice.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1
*/

#include "bits/stdc++.h"
using namespace std;

long maximumSumSubarray(int k, vector<int> &arr , int n){
    long long int sum = 0,maxi = 0;
    for(int i=0;i<k;i++) sum += arr[i];
    maxi = max(maxi,sum);
    for(int r=k;r<n;r++){
        sum += arr[r];
        sum -= arr[r-k];
        maxi = max(maxi,sum);
    }
    return maxi;
}