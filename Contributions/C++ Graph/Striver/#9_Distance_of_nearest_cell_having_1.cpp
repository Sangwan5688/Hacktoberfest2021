/*
    TODO: Distance of nearest cell having 1
    ? https://practice.geeksforgeeks.org/problems/distance-of-nearest-cell-having-1-1587115620/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=distance-of-nearest-cell-having-1
*/

#include "bits/stdc++.h"
using namespace std;

//! new method consider only the shortest distance and form into queue
class Solution {
    public:
    vector<vector<bool>> visit;
    vector<vector<int>> ans;
    bool isValid(int i, int j, vector<vector<int>>& grid) {
        return ((i >= 0) and (j >= 0) and (i < grid.size()) 
            and (j < grid[0].size()) and (grid[i][j] == 0) 
            and (visit[i][j] == false));
    }
	vector<vector<int>>nearest(vector<vector<int>>grid) {
	    int n = grid.size(), m = grid[0].size();
	    ans.resize(n, vector<int> (m,-1));
	    visit.resize(n, vector<bool> (m,false));
	    queue<pair<int,int>> q;
	    for(int i=0;i<n;i++){
	        for(int j=0;j<m;j++){
	            if(grid[i][j]){
	                ans[i][j] = 0;
	                q.push({i,j});
	            }
	        }   
	    }
	    int steps = 0;
	    while(!q.empty()){
	        int sz = q.size();
	        for(int i=0;i<sz;i++){
	            int x = q.front().first, y = q.front().second;
	            q.pop();
	            if(visit[x][y] != true){
	                visit[x][y] = true;
	            
                    if(ans[x][y] == -1) ans[x][y] = steps;
                    
                    if(isValid(x+1,y,grid)) q.push({x+1,y});
                    if(isValid(x-1,y,grid)) q.push({x-1,y});
                    if(isValid(x,y+1,grid)) q.push({x,y+1});
                    if(isValid(x,y-1,grid)) q.push({x,y-1});   
	            }
	        }
	        steps++;
	    }
	    return ans;
	}
};

class Solution {
    public:
    bool isValid(int i, int j, vector<vector<int>>& grid) {
        return ((i >= 0) and (j >= 0) and (i < grid.size()) 
        and (j < grid[0].size()));
    }
    int bfs(int i, int j, vector<vector<int>>& grid){
        queue<pair<int,int>> q;
        q.push({i,j});
        int step = 0;
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int x = q.front().first, y = q.front().second;
                q.pop();
                if(grid[x][y]) return step;
                
                if(isValid(x+1,y,grid)) q.push({x+1,y});
                if(isValid(x-1,y,grid)) q.push({x-1,y});
                if(isValid(x,y+1,grid)) q.push({x,y+1});
                if(isValid(x,y-1,grid)) q.push({x,y-1});
            }
            step++;
        }
    }
	vector<vector<int>>nearest(vector<vector<int>>grid) {
	    int n = grid.size(), m = grid[0].size();
	    vector<vector<int>> ans(n, vector<int> (m,0));
	    for(int i=0;i<n;i++){
	        for(int j=0;j<m;j++){
	            ans[i][j] = bfs(i,j,grid);
	        }
	    }
	    return ans;
	}
};