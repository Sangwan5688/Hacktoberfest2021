/*
    TODO: Maximal Rectangle
    ? https://leetcode.com/problems/maximal-rectangle/description/
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
    int MAH(vector<int>& heights) { // maximum area of histogram
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
    int maximalRectangle(vector<vector<char>>& matrix) {
        int n = matrix.size(), m = matrix[0].size();
        vector<int> heights(m,-1);
        int mx = 0;

        for(int i=0;i<n;i++) {
            for(int j=0;j<m;j++) {
                if(heights[j] == -1) {
                    if(matrix[i][j] == '1') heights[j] = 1;
                    else heights[j] = 0;
                } else if(matrix[i][j] == '1') heights[j]++;
                else if(heights[j] and matrix[i][j] == '1') heights[j] = 0;
                else heights[j] = 0;
            }
            mx = max(mx,MAH(heights));
        }

        return mx;
    }
};