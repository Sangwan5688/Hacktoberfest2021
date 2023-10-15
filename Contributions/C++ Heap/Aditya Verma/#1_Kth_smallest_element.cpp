/*
    TODO: Kth smallest element
    ? https://practice.geeksforgeeks.org/problems/kth-smallest-element5635/1
*/
 
#include "bits/stdc++.h"
using namespace std;

//! heap method Optimal
class Solution{
    public:
    int kthSmallest(int arr[], int l, int r, int k) {
        priority_queue<int> pq;
        for(int i=l;i<=r;i++) {
            pq.push(arr[i]);
            if(pq.size() > k) pq.pop();
        }
        return pq.top();
    }
};

//! shorting method
class Solution{
    public:
    int kthSmallest(int arr[], int l, int r, int k) {        
        vector<int> ans;
        for(int i=l;i<=r;i++) ans.push_back(arr[i]);
        sort(ans.begin(),ans.end());
        k--;
        return ans[k];
    }
};

//! heap method Bute TLE
class Solution{
    public:
    int kthSmallest(int arr[], int l, int r, int k) {        
        priority_queue<int,vector<int>,greater<>> pq;
        for(int i=l;i<=r;i++) pq.push(arr[i]);
        if(pq.size() < k) return -1;
        int ans = 0;
        while(k-- and !pq.empty()) {
            ans = pq.top();
            pq.pop();
        }
        return ans;
    }
};