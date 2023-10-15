/*
    TODO: Rotten Oranges
    ? https://practice.geeksforgeeks.org/problems/rotten-oranges2536/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=rotten_oranges
*/

#include "bits/stdc++.h"
using namespace std;

//! gfg bfs
class Solution {
    public:
    bool isValid(int i, int j, vector<vector<int>>& grid) {
        return ((i >= 0) and (j >= 0) and (i < grid.size()) 
        and (j < grid[0].size()) and (grid[i][j] == 1));
    }
    int orangesRotting(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        
        vector<vector<bool>> visit(n, vector<bool> (m,false));
        queue<pair<int,int>> q;
        
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j] == 2){
                    q.push({i,j});
                }
            }
        }
        int cnt = 0;        
        while(!q.empty()){
            int sz = q.size(), temp = 0;
            for(int i=0;i<sz;i++){
                int x = q.front().first, y = q.front().second;
                grid[x][y] = 2;
                if(visit[x][y] == true) temp++;
                visit[x][y] = true;

                q.pop();
                
                if(isValid(x+1,y,grid)) {
                    q.push({x+1,y});
                }
                
                if(isValid(x-1,y,grid)) {
                    q.push({x-1,y});
                }
                
                if(isValid(x,y+1,grid)) {
                    q.push({x,y+1});
                }
                
                if(isValid(x,y-1,grid)) {
                    q.push({x,y-1});
                }
            }
            // cout<<sz<<" "<<temp<<endl;
            if(temp != sz) cnt++;
        }
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(grid[i][j] == 1) return -1;
            }
        }
        return cnt == 0 ? cnt : cnt-1;   
    }
};