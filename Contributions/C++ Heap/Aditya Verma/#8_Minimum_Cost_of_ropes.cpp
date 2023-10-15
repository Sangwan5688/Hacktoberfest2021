/*
    TODO: Minimum Cost of ropes
    ? https://practice.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
    public:
    typedef long long ll;
    ll minCost(ll arr[], ll n) {
        if(n == 1) return 0;
        priority_queue<ll,vector<ll>,greater<>> pq;
        for(ll i=0;i<n;i++) pq.push(arr[i]);
        
        ll cost = 0;
        while(pq.size() != 1) {
            ll no1 = pq.top(), no2 = -1;
            pq.pop();
            if(!pq.empty()) no2 = pq.top();
            pq.pop();
            
            cost += no1 + no2;
            pq.push(no1+no2);
        }
        return cost;
    }
};
