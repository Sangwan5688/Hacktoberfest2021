/*
    TODO: Sort Array by Increasing Frequency
    ? https://leetcode.com/problems/sort-array-by-increasing-frequency/description/
*/
 
#include "bits/stdc++.h"
using namespace std;

typedef pair<int,int> pii;
struct Compare {
    bool operator()(pii const& p1, pii const& p2){
        if(p1.first == p2.first) {
            return p1.second < p2.second;
        }
        return p1.first > p2.first;
    }
};

class Solution {
public:
    vector<int> frequencySort(vector<int>& nums) {
        map<int,int> mp;
        for(auto i : nums) mp[i]++;
        priority_queue<pii,vector<pii>,Compare> pq;
        for(auto [ch,cnt] : mp) {
            pq.push({cnt,ch});
        }
        vector<int> ans;
        while(!pq.empty()) {
            int no = pq.top().first;
            int val = pq.top().second;
            while(no--) ans.push_back(val);
            pq.pop();
        }
        return ans;
    }
};