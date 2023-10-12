/*
    TODO: Find K Closest Elements
    ? https://leetcode.com/problems/find-k-closest-elements/
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int n = arr.size();
        priority_queue<pair<int,int>> pq;
        for(int i=0;i<n;i++) {
            int dist = abs(arr[i] - x);
            pq.push({dist,arr[i]});
            if(pq.size() > k) pq.pop();
        }
        vector<int> ans;
        while(!pq.empty()) {
            ans.push_back(pq.top().second);
            pq.pop();
        }
        sort(ans.begin(),ans.end());
        return ans;
    }
};