/*
    TODO: First negative integer in every window of size k
    ? https://practice.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1
*/

#include "bits/stdc++.h"
using namespace std;

vector<long long> printFirstNegativeInteger(long long int arr[],
                                             long long int n, long long int k) {
    vector<long long> res;
    vector<long long> window;
    for(int i=0;i<k;i++) if(arr[i] < 0) window.push_back(arr[i]);
    
    if(window.size() == 0) res.push_back(0);
    else res.push_back(window.front());
    
    for(int i=k;i<n;i++){
        if(arr[i] < 0) window.push_back(arr[i]);
        if(arr[i-k] < 0) window.erase(window.begin());
        
        if(window.size() == 0) res.push_back(0);
        else res.push_back(window.front());
    }
    
    return res;
}