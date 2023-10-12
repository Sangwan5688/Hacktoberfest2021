/*
    TODO: Search a 2D Matrix II
    ? https://leetcode.com/problems/search-a-2d-matrix-ii/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool isPossible(int i, int j, int n, int m) {
        return i >= 0 and j >= 0 and i < n and j < m;
    }
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size(), m = matrix[0].size();
        int i = 0, j = m-1; 
        while(isPossible(i,j,n,m)) {
            // cout<<i<<" "<<j<<endl;
            if(matrix[i][j] == target) return true;
            else if(matrix[i][j] > target) j--;
            else i++;
        }
        return false;
    }
};