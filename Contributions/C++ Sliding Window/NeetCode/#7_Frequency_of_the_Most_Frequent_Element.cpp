/*
    TODO: Frequency of the Most Frequent Element
    ? https://leetcode.com/problems/frequency-of-the-most-frequent-element/
*/

#include "bits/stdc++.h"
using namespace std;

typedef long long int ll;
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(),nums.end());
        map<int,int> mp;
        ll n = nums.size(), prev = 0, total = 0, ans = 0;

        for(int i=0;i<n;i++) {
            total += nums[i];
            ll suppose_val = nums[i]*1ll*(i - prev + 1);
            if(suppose_val <= total + k) {
                ans = max(ans, (i - prev + 1));
                continue;
            }
            // cout<<"ASD"<<endl;
            while(suppose_val > total + k and prev < i) {
                total -= nums[prev];
                prev++;
                suppose_val = nums[i]*1ll*(i - prev + 1);
            }
        }

        return ans;
    }
};

//! Java