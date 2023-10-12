/*
    TODO: Number Of Enclaves
    ? https://practice.geeksforgeeks.org/problems/number-of-enclaves/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=number-of-enclaves
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<vector<bool>> visit;
    bool isValid(int i, int j, vector<vector<int>>& grid) {
        return ((i >= 0) and (j >= 0) and (i < grid.size()) 
            and (j < grid[0].size()) and grid[i][j] 
            and visit[i][j] == false);
    }
    int numberOfEnclaves(vector<vector<int>> &grid) {
        int n = grid.size(), m = grid[0].size();
        visit.resize(n, vector<bool> (m,false));
        queue<pair<int,int>> q;
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(i == 0 or j == 0 or i == n-1 or j == m-1){
                    visit[i][j] = true;
                    if(grid[i][j]) q.push({i,j});
                }
            }
        }
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int x = q.front().first, y = q.front().second;
                visit[x][y] = true;
                grid[x][y] = 0;
                q.pop();
                
                if(isValid(x+1,y,grid)) q.push({x+1,y});
                if(isValid(x-1,y,grid)) q.push({x-1,y});
                if(isValid(x,y+1,grid)) q.push({x,y+1});
                if(isValid(x,y-1,grid)) q.push({x,y-1});
            }
        }
        int cnt = 0;
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(visit[i][j] == false and grid[i][j]) cnt++;
            }
        }
        return cnt;
    }
};

class Solution {
  public:
    vector<vector<bool>> visit;
    bool isValid(int i, int j, vector<vector<int>>& grid) {
        return ((i >= 0) and (j >= 0) and (i < grid.size())
            and (j < grid[0].size()) and grid[i][j]);
    }
    void bfs(int i, int j, vector<vector<int>>& grid) {
        if(!isValid(i,j,grid)) return;
        grid[i][j] = 0;
        bfs(i+1,j,grid);
        bfs(i-1,j,grid);
        bfs(i,j+1,grid);
        bfs(i,j-1,grid);
    }
    int numberOfEnclaves(vector<vector<int>> &grid) {
        int n = grid.size(), m = grid[0].size();
        visit.resize(n, vector<bool> (m,false));
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if((i == 0) or (j == 0) or (i == n-1) or (j == m-1)){
                    visit[i][j] = true;
                    if(grid[i][j]) bfs(i,j,grid);
                }
            }
        }
        int cnt = 0;
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(visit[i][j] == false and grid[i][j]) cnt++;
            }
        }
        return cnt;
    }
};