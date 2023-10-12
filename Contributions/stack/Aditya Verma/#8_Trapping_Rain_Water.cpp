/*
    TODO: Trapping Rain Water
    ? https://leetcode.com/problems/maximal-rectangle/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int lmaxi = 0, rmaxi = 0, cnt = 0;
        int low = 0, high = height.size()-1;
        while(low <= high) {
            if(height[low] <= height[high]) {
                if(height[low] < lmaxi) cnt += (lmaxi - height[low]);
                else lmaxi = max(lmaxi,height[low]);
                low++;
            } else {
                if(height[high] < rmaxi) cnt += (rmaxi - height[high]);
                else rmaxi = max(rmaxi,height[high]);
                high--;
            }
        }
        return cnt;
    }
};