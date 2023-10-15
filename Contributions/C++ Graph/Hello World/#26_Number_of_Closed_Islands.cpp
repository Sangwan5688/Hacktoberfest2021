/*
    TODO: Number of Closed Islands
    ? https://leetcode.com/problems/number-of-closed-islands/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool isValid(int i,int j,vector<vector<int>>& grid){
        return ((i >= 0) and (i < grid.size()) and (j >= 0) and (j < grid[0].size()) and !grid[i][j]);
    }
    void traverse(int i,int j,vector<vector<int>>& grid){
        if(!isValid(i,j,grid)) return;
        grid[i][j] = 1;
        traverse(i+1,j,grid);
        traverse(i-1,j,grid);
        traverse(i,j+1,grid);
        traverse(i,j-1,grid);
    }
    int closedIsland(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if((i == 0 or i == n-1 or j == 0 or j == m-1) and !grid[i][j]){
                    traverse(i,j,grid);
                }
            }
        }
        int cnt = 0;
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(!grid[i][j]){
                    traverse(i,j,grid);
                    cnt++;
                }
            }
        }
        return cnt;
    }
};