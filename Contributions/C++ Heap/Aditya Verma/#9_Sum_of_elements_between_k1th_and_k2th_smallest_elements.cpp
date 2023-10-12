/*
    TODO: Sum of elements between k1'th and k2'th smallest elements
    ? https://practice.geeksforgeeks.org/problems/sum-of-elements-between-k1th-and-k2th-smallest-elements3133/1
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution{
    public:
    typedef long long ll;
    ll sumBetweenTwoKth(ll arr[], ll n, ll k1, ll k2) {
        ll sz = max(k1,k2), mn = min(k1,k2);
        priority_queue<ll> pq;
        
        for(ll i=0;i<n;i++) {
            pq.push(arr[i]);
            if(pq.size() > sz) pq.pop();
        }
        
        ll ans = 0;
        pq.pop();
        
        while(!pq.empty()) {
            if(pq.size() == mn) break;
            ans += pq.top();
            pq.pop();
        }
        
        return ans;
    }
}; 