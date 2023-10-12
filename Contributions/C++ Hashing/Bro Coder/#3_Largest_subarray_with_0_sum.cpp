/* 
    TODO: Largest subarray with 0 sum
    ? https://practice.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1
 */

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int maxLen(vector<int>& arr, int n) {
        unordered_map<int,int> mp;
        mp[0] = -1;
        int sumi = 0, mx = 0;
        for(int i=0;i<arr.size();i++) {
            sumi += arr[i];
            if(mp.find(sumi) != mp.end()) {
                mx = max(mx, i - mp[sumi]);
            } else mp[sumi] = i;
        }
        return mx;
    }
};