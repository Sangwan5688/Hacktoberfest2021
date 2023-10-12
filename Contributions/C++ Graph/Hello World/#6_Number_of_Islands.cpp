/*
    TODO: Number of Islands
    ? https://leetcode.com/problems/number-of-islands/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool isValid(int i,int j, vector<vector<bool>> &visit, vector<vector<char>> &grid){
        return (0 <= i and i < grid.size() and 0 <= j and j < grid[0].size() and grid[i][j] == '1' and !visit[i][j]);
    }
    void pre(int i,int j, vector<vector<bool>> &visit, vector<vector<char>> &grid){
        visit[i][j] = true;
        if(isValid(i+1,j,visit,grid)) pre(i+1,j,visit,grid);
        if(isValid(i-1,j,visit,grid)) pre(i-1,j,visit,grid);
        if(isValid(i,j+1,visit,grid)) pre(i,j+1,visit,grid); 
        if(isValid(i,j-1,visit,grid)) pre(i,j-1,visit,grid);
    }
    int numIslands(vector<vector<char>>& grid) {
        int n = grid.size(), m = grid[0].size(), cnt = 0;
        vector<vector<bool>> visit(n+1, vector<bool> (m+1,false));

        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j] == '1' and !visit[i][j]){
                    pre(i,j,visit,grid);
                    cnt++;
                }
            }
        }

        return cnt;
    }
};

// ? second
class Solution {
public:
    bool isValid(int i,int j, vector<vector<bool>> &visit, vector<vector<char>> &grid){
        return (0 <= i and i < grid.size() and 0 <= j and j < grid[0].size() and grid[i][j] == '1');
    }
    void pre(int i,int j, vector<vector<bool>> &visit, vector<vector<char>> &grid){
        grid[i][j] = '0';
        if(isValid(i+1,j,visit,grid)) pre(i+1,j,visit,grid);
        if(isValid(i-1,j,visit,grid)) pre(i-1,j,visit,grid);
        if(isValid(i,j+1,visit,grid)) pre(i,j+1,visit,grid); 
        if(isValid(i,j-1,visit,grid)) pre(i,j-1,visit,grid);
    }
    int numIslands(vector<vector<char>>& grid) {
        int n = grid.size(), m = grid[0].size(), cnt = 0;
        vector<vector<bool>> visit(n+1, vector<bool> (m+1,false));

        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j] == '1'){
                    pre(i,j,visit,grid);
                    cnt++;
                }
            }
        }

        return cnt;
    }
};