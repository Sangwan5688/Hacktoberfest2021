/*
    TODO: Rotting Oranges
    ? https://leetcode.com/problems/rotting-oranges/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool isValid(int i,int j,vector<vector<int>>& grid){
        return ((i>=0) and (j>=0) and (i<grid.size()) and (j<grid[0].size()) and (grid[i][j] == 1));
    }
    int orangesRotting(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        queue<pair<int,int>> q;
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j] == 2){
                    q.push({i,j});
                }
            }
        }
        int time = 0,t = q.size();
        while(!q.empty()){
            int curr = 0,tt = t;
            while(t--){
                int i = q.front().first, j = q.front().second;
                cout<<i<<" "<<j<<" "<<grid[i][j]<<endl;
                q.pop();
                if(grid[i][j] == 2 and time != 0) curr++;
                grid[i][j] = 2;
                if(isValid(i+1,j,grid)) q.push({i+1,j});
                if(isValid(i-1,j,grid)) q.push({i-1,j});
                if(isValid(i,j+1,grid)) q.push({i,j+1});
                if(isValid(i,j-1,grid)) q.push({i,j-1});
            }
            t = q.size();
            cout<<time<<endl;
            if(curr != tt) time++;
        }
        for(auto i : grid) for(auto j : i) if(j == 1) return -1;
        return time == 0 ? time : time-1;
    }
};

class Solution {
public:
    bool isValid(int i,int j,vector<vector<int>>& grid){
        return ((i>=0) and (j>=0) and (i<grid.size()) and (j<grid[0].size()) and (grid[i][j] == 1));
    }
    int orangesRotting(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        queue<pair<int,int>> q;
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j] == 2){
                    q.push({i,j});
                }
            }
        }
        int time = 0,t = q.size();
        while(!q.empty()){
            int curr = 0,tt = t;
            while(t--){
                int i = q.front().first, j = q.front().second;
                q.pop();
                if(grid[i][j] == 2 and time != 0) curr++;
                grid[i][j] = 2;
                int ax[4] = {1,-1,0,0}, ay[4] = {0,0,1,-1};
                for(int _ = 0; _ < 4;_++){
                    int x = ax[_] + i, y = ay[_] + j;
                    if(isValid(x,y,grid)) q.push({x,y});
                }
            }
            t = q.size();
            if(curr != tt) time++;
        }
        for(auto i : grid) for(auto j : i) if(j == 1) return -1;
        return time == 0 ? time : time-1;
    }
};