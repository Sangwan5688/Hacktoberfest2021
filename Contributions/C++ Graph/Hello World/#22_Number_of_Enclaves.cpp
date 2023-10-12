/*
    TODO: Number of Enclaves
    ? https://leetcode.com/problems/number-of-enclaves/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool isValid(int i,int j,vector<vector<int>>& grid, vector<vector<bool>>& visit){
        return ( (i>=0) and (j>=0) and (i<grid.size()) and (j<grid[0].size()) and (!visit[i][j]) and (grid[i][j]) );
    }
    void bfs(int i,int j,vector<vector<int>>& grid, vector<vector<bool>>& visit){
        if(!isValid(i,j,grid,visit)) return;
        visit[i][j] = true;
        grid[i][j] = 0;
        bfs(i+1,j,grid,visit);
        bfs(i-1,j,grid,visit);
        bfs(i,j+1,grid,visit);
        bfs(i,j-1,grid,visit);
    }
    int numEnclaves(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<vector<bool>> visit(n+1, vector<bool> (m+1,false));
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(((i == 0) or (j == 0) or (i == n-1) or (j == m-1)) and grid[i][j]){
                    bfs(i,j,grid,visit);
                }
            }
        }
        for(auto i : grid){
            for(auto j : i) cout<<j<<" ";
            cout<<endl;
        }
        int res = 0;
        for(auto i : grid) for(auto j : i) if(j) res++;
        return res;
    }
};

class Solution {
public:
    bool isValid(int i,int j,vector<vector<int>>& grid){
        return ( (i>=0) and (j>=0) and (i<grid.size()) and (j<grid[0].size()) and (grid[i][j]) );
    }
    void bfs(int i,int j,vector<vector<int>>& grid){
        if(!isValid(i,j,grid)) return;
        grid[i][j] = 0;
        bfs(i+1,j,grid);
        bfs(i-1,j,grid);
        bfs(i,j+1,grid);
        bfs(i,j-1,grid);
    }
    int numEnclaves(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(((i == 0) or (j == 0) or (i == n-1) or (j == m-1)) and grid[i][j]){
                    bfs(i,j,grid);
                }
            }
        }
        int res = 0;
        for(auto i : grid) for(auto j : i) if(j) res++;
        return res;
    }
};