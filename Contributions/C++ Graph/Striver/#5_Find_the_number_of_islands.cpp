/*
    TODO: Find the number of islands
    ? https://practice.geeksforgeeks.org/problems/find-the-number-of-islands/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=find_the_number_of_islands
*/

#include "bits/stdc++.h"
using namespace std;

//! gfg bfs
class Solution {
  public:
    bool isValid(int i,int j,vector<vector<char>>& grid){
        return ((i >= 0) and (j >= 0) and (i < grid.size()) and (j < grid[0].size() and (grid[i][j] == '1')));
    }
    void bfs(int i,int j,vector<vector<char>>& grid){
        if(!isValid(i,j,grid)) return;
        grid[i][j] = '0';
        bfs(i+1,j,grid);
        bfs(i-1,j,grid);
        bfs(i,j+1,grid);
        bfs(i,j-1,grid);
        
        bfs(i+1,j-1,grid);
        bfs(i+1,j+1,grid);
        bfs(i-1,j-1,grid);
        bfs(i-1,j+1,grid);
    }
    int numIslands(vector<vector<char>>& grid) {
        int cnt = 0,n = grid.size(), m = grid[0].size();
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j] == '1'){
                    bfs(i,j,grid);
                    cnt++;
                }
            }
        }
        return cnt;
    }
};