/* 
    TODO: Sum equals to Sum
    ? https://practice.geeksforgeeks.org/problems/sum-equals-to-sum4006/1
 */

#include "bits/stdc++.h"
using namespace std;

typedef long long ll;
class Solution {
public:
    int findPairs(ll a[], ll n) {
        unordered_map<ll, int>mp;
        for(int i=0;i<n;i++) {
            for(int j=i+1;j<n;j++) {
                mp[a[i] + a[j]]++;
                if(mp[a[i] + a[j]] > 1) return true;
            }
        }
        return false;
    }
};

typedef long long ll;
class Solution {
public:
    int findPairs(ll a[], ll n) {
        unordered_map<ll, vector<pair<int,int>>>mp;
        for(int i=0;i<n;i++) {
            for(int j=i+1;j<n;j++) {
                mp[a[i] + a[j]].push_back({a[i],a[j]});
                if(mp[a[i] + a[j]].size() > 1) return true;
            }
        }
        return false;
    }
};