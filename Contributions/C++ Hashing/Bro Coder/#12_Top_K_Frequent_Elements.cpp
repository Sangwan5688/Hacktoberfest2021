/* 
    TODO: Top K Frequent Elements
    ? https://leetcode.com/problems/top-k-frequent-elements/
 */

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        priority_queue<pair<int,int>> pq;
        map<int,int> mp;
        for(auto i : nums) mp[i]++;
        for(auto [i,j] : mp){
            pq.push({j,i});
        }
        vector<int> ans;
        while(k--){
            ans.push_back(pq.top().second);
            pq.pop();
        }
        return ans;
    }
};