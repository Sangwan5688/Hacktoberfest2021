/*
    TODO: Number of Distinct Islands
    ? https://practice.geeksforgeeks.org/problems/number-of-distinct-islands/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=number-of-distinct-islands
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    int xx = -1, yy = -1; // ⭐⭐⭐⭐⭐
    bool isValid(int i, int j, vector<vector<int>>& grid) {
        return ((i >= 0) and (j >= 0) and (i < grid.size()) and 
            (j < grid[0].size()) and grid[i][j]);
    }
    void dfs(int i, int j, vector<vector<int>>& grid, 
        vector<pair<int,int>>& ds) {
        grid[i][j] = 0;
        vector<int> ax = {0,0,1,-1}, ay = {1,-1,0,0};
        for(int k=0;k<4;k++){
            int x = ax[k] + i, y = ay[k] + j;
            if(isValid(x,y,grid)){
                ds.push_back({x - xx,y - yy});
                dfs(x,y,grid,ds);
            }
        }
    }
    int countDistinctIslands(vector<vector<int>>& grid) {
        set<vector<pair<int,int>>> dist;
        int n = grid.size(), m = grid[0].size();
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j]){
                    xx = i, yy = j;
                    vector<pair<int,int>> ds = {{0,0}};
                    dfs(i,j,grid,ds);
                    dist.insert(ds);
                }
            }
        }
        return dist.size();
    }
};

//! fail 2
class Solution {
  public:
    bool isValid(int i, int j, vector<vector<int>>& grid) {
        return ((i >= 0) and (j >= 0) and (i < grid.size()) and 
            (j < grid[0].size()) and grid[i][j]);
    }
    void dfs(int i, int j, vector<vector<int>>& grid, 
        vector<pair<int,int>>& ds) {
        grid[i][j] = 0;
        vector<int> ax = {0,0,1,-1}, ay = {1,-1,0,0};
        for(int k=0;k<4;k++){
            int x = ax[k] + i, y = ay[k] + j;
            if(isValid(x,y,grid)){
                ds.push_back({ax[k],ay[k]});
                dfs(x,y,grid,ds);
            }
        }
    }
    int countDistinctIslands(vector<vector<int>>& grid) {
        set<vector<pair<int,int>>> dist;
        int n = grid.size(), m = grid[0].size();
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j]){
                    vector<pair<int,int>> ds = {{0,0}};
                    dfs(i,j,grid,ds);
                    dist.insert(ds);
                }
            }
        }
        return dist.size();
    }
};

//! fail 1
class Solution {
  public:
    vector<vector<bool>> visit;
    bool flag = false;
    bool isValid(int i, int j, vector<vector<int>>& grid) {
        return ((i >= 0) and (j >= 0) and (i < grid.size()) and 
            (j < grid[0].size()) and grid[i][j] and
                (visit[i][j] == false));
    }
    void dfs(int i, int j, vector<vector<int>>& grid, 
        vector<pair<int,int>>& ds) {
        if(!isValid(i,j,grid)) return;
        
        if(flag == false){
            ds.push_back({0,0});
            flag = true;
        }
        
        visit[i][j] = true;
        grid[i][j] = 0;
        
        if(isValid(i+1,j,grid)){
            ds.push_back({1,0});
            dfs(i+1,j,grid,ds);    
        }
        if(isValid(i-1,j,grid)){
            ds.push_back({-1,0});
            dfs(i-1,j,grid,ds);    
        }
        if(isValid(i,j+1,grid)){
            ds.push_back({0,1});
            dfs(i,j+1,grid,ds);
        }
        if(isValid(i,j-1,grid)){
            ds.push_back({0,-1});
            dfs(i,j-1,grid,ds);
        }
    }
    int countDistinctIslands(vector<vector<int>>& grid) {
        set<vector<pair<int,int>>> dist;
        int n = grid.size(), m = grid[0].size();
        visit.resize(n, vector<bool> (m,false));
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j] and visit[i][j] == false){
                    flag = false;
                    vector<pair<int,int>> ds;
                    dfs(i,j,grid,ds);
                    // cout<<area<<endl;
                    // for(auto i :ds){
                    //     cout<<i.first<<" "<<i.second<<", ";
                    // }
                    // cout<<endl;
                    dist.insert(ds);
                }
            }
        }
        return dist.size();
    }
};
