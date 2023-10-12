/* 
    TODO: Subarrays With At Most ‘K’ Distinct Values 
    ? https://www.codingninjas.com/codestudio/problems/subarrays-with-at-most-k-distinct-values_1473804
    ! intution
    ? https://www.youtube.com/watch?v=shsYUyF7pEs&ab_channel=Pepcoding
 */

#include "bits/stdc++.h"
using namespace std;

int kDistinctSubarrays(vector<int> &arr, int n, int k) {
    unordered_map<int,int> mp, sz;
    int prev = 0, cnt = 0;
    for(int i=0;i<n;i++) {
        mp[arr[i]]++;

        if(mp.size() <= k) {
            cnt += (i - prev + 1);
            continue;
        }

        while(mp.size() > k) {
            mp[arr[prev]]--;
            if(mp[arr[prev]] == 0) mp.erase(arr[prev]);
            prev++;
        }

        if(mp.size() <= k) {
            cnt += (i - prev + 1);
            continue;
        }
    }
    return cnt;
}