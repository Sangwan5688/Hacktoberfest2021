/*
    TODO: Nearly sorted
    ? https://practice.geeksforgeeks.org/problems/nearly-sorted-1587115620/1
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
    public:
    vector <int> nearlySorted(int arr[], int num, int K){
        priority_queue<int,vector<int>,greater<>> pq;
        vector<int> ans;
        for(int i=0;i<num;i++) {
            pq.push(arr[i]);
            if(pq.size() > K) {
                ans.push_back(pq.top());
                pq.pop();
            }
        }
        while(!pq.empty()) {
            ans.push_back(pq.top());
            pq.pop();
        }
        return ans;
    }
};