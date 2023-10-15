/*
    TODO: Stock span problem
    ? https://practice.geeksforgeeks.org/problems/stock-span-problem-1587115621/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
    public:
    vector <int> calculateSpan(int arr[], int n) {
        stack <pair<int,int>> st;
        vector<int> ans(n,0);
       for(int i=0;i<n;i++) {
           int cnt = 1;
           while(!st.empty() and arr[i] >= st.top().first) {
               cnt += st.top().second;
               st.pop();
           }
           ans[i] = cnt;
           st.push({arr[i],cnt});
       }
       return ans;
    }
};