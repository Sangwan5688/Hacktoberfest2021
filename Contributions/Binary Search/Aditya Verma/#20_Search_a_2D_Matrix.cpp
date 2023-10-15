/*
    TODO: Search a 2D Matrix
    ? https://leetcode.com/problems/search-a-2d-matrix/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size(), m = matrix[0].size(); 
        int low = 0, high = n*m - 1;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            int i = mid/m, j = mid%m;
            if(matrix[i][j] == target) return true;
            else if(matrix[i][j] < target) low = mid+1;
            else high = mid-1;
        }
        return false;
    }
};