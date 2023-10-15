/* 
    TODO: Zero Sum Subarrays
    ? https://practice.geeksforgeeks.org/problems/zero-sum-subarrays1825/1
 */

#include "bits/stdc++.h"
using namespace std;

typedef long long int ll;
class Solution{
public:
    ll findSubarray(vector<ll> &arr, int n ) {
        unordered_map<ll,int> mp;
        int sumi = 0, cnt = 0;
        mp[sumi] = 1;
        
        for(int i=0;i < arr.size();i++) {
            sumi += arr[i];
            mp[sumi]++;
        }
        
        for(auto i : mp) {
            cnt += ((i.second - 1) * i.second) / 2;
        }
        
        return cnt;
    }
};