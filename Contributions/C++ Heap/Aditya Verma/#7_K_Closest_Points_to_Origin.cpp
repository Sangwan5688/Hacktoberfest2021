/*
    TODO: K Closest Points to Origin
    ? https://leetcode.com/problems/k-closest-points-to-origin/
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<pair<double,pair<int,int>>, vector<pair<double,pair<int,int>>>,
        greater<>> pq;
        for(auto arr : points) {
            double dist = sqrt(arr[0]*arr[0] + arr[1]*arr[1]);
            pq.push({dist,{arr[0],arr[1]}});
        }
        vector<vector<int>> ans;
        while(!pq.empty() and k--) {
            auto pr = pq.top();
            ans.push_back({pr.second.first,pr.second.second});
            pq.pop();
        }
        return ans;
    }
};