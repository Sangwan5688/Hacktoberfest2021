/* 
    TODO: Largest Continuous Sequence Zero Sum
    ? https://www.interviewbit.com/old/problems/largest-continuous-sequence-zero-sum/
 */

#include "bits/stdc++.h"
using namespace std;

vector<int> Solution::lszero(vector<int> &arr) {
    unordered_map<int,int> mp;
    vector<int> ans;
    int sumi = 0, n = arr.size(), mx = 0;
    mp[sumi] = -1;
    for(int i=0;i<n;i++) {
        sumi += arr[i];
        if(mp.find(sumi) != mp.end()) {
            if(mx < i - mp[sumi]) {
                mx = i - mp[sumi];
                ans.clear();
                ans.insert(ans.end(),arr.begin() + mp[sumi]+1, arr.begin() + i+1);
            }
        } else mp[sumi] = i;
    }
    return ans;
}
