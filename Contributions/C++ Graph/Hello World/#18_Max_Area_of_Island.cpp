/*
    TODO: Max Area of Island
    ? https://leetcode.com/problems/max-area-of-island/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int maxi = 0;
    bool isValid(int i,int j,vector<vector<bool>> &visit,vector<vector<int>>& grid){
        return ((i >= 0) and (j >= 0) and (i < grid.size()) and (j < grid[i].size()) and (grid[i][j] == 1) and (visit[i][j] == false));
    }
    void pre(int &area,int i,int j,vector<vector<bool>> &visit,vector<vector<int>>& grid){
        if(!isValid(i,j,visit,grid)) return;
        area++;
        visit[i][j] = true;
        pre(area,i+1,j,visit,grid);
        pre(area,i-1,j,visit,grid);
        pre(area,i,j+1,visit,grid);
        pre(area,i,j-1,visit,grid);
    }
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int n = grid.size() , m = grid[0].size();
        vector<vector<bool>> visit(n+1, vector<bool> (m+1,false));
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j] and (visit[i][j] == false)){
                    int temp = 0;
                    pre(temp,i,j,visit,grid);
                    maxi = max(maxi,temp);
                }
            }
        }
        return maxi;
    }
};