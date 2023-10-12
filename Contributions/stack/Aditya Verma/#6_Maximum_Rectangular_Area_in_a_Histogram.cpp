/*
    TODO: Maximum Rectangular Area in a Histogram
    ? https://practice.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<int> nearestSmallerRight(vector<int>& heights) {
        int n = heights.size();
        vector<int> ans(n,0);
        stack<pair<int,int>> st;
        for(int i=0;i<n;i++) {
            int cnt = 1;
            while(!st.empty() and heights[i] <= st.top().first) {
                cnt += st.top().second;
                st.pop();
            }
            ans[i] = cnt;
            st.push({heights[i],cnt});
        }
        return ans;
    }
    vector<int> nearestSmallerLeft(vector<int>& heights) {
        int n = heights.size();
        vector<int> ans(n,0);
        stack<pair<int,int>> st;
        for(int i=n-1;i>=0;i--) {
            int cnt = 1;
            while(!st.empty() and heights[i] <= st.top().first) {
                cnt += st.top().second;
                st.pop();
            }
            ans[i] = cnt;
            st.push({heights[i],cnt});
        }
        return ans;
    }
    int largestRectangleArea(vector<int>& heights) {
        vector<int> nsr = nearestSmallerRight(heights);
        vector<int> nsl = nearestSmallerLeft(heights);
        int n = heights.size();

        int mx = 0;
        for(int i=0;i<n;i++) {
            int area = (nsl[i] + nsr[i] - 1)*heights[i];
            mx = max(mx,area);
        }

        return mx;
    }
};
