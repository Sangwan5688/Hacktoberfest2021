/*
    TODO: Top K Frequent Elements in Array
    ? https://practice.geeksforgeeks.org/problems/top-k-frequent-elements-in-array/1
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<int> topK(vector<int>& nums, int k) {
        map<int,int> mp;
        for(auto i : nums) mp[i]++;
        priority_queue<pair<int,int>> pq;
        for(auto i : mp) 
            pq.push({i.second,i.first});
            
        vector<int> ans;
        while(!pq.empty() and k--) {
            ans.push_back(pq.top().second);
            pq.pop();
        }
        return ans;
    }
};
