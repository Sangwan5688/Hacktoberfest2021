/*
    TODO: 01 Matrix
    ? https://leetcode.com/problems/01-matrix/description/
    ! we have just consider distance from the matrix value having 0's in bfs order ~ consider dp + memo
*/

#include "bits/stdc++.h"
using namespace std;



class Solution {
public:
    vector<vector<int>> visit;
    bool isValid(int i, int j, vector<vector<int>>& grid) {
        return ((i >= 0) and (j >= 0) and (i < grid.size()) 
        and (j < grid[0].size()) and (grid[i][j] == 1));
    }
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
	    int n = mat.size(), m = mat[0].size();
        visit.resize(n, vector<int> (m,-1));
        queue<pair<int,int>> q;
	    for(int i=0;i<n;i++){
	        for(int j=0;j<m;j++){
                if(!mat[i][j]) visit[i][j] = 0,q.push({i,j});
	        }
	    }
        int steps = 0;
        while(!q.empty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                int x = q.front().first, y = q.front().second;
                if(visit[x][y] == -1) visit[x][y] = steps;
                q.pop();

                // cout<<x<<" "<<y<<endl;
                if(isValid(x+1,y,mat)) q.push({x+1,y});
                if(isValid(x-1,y,mat)) q.push({x-1,y});
                if(isValid(x,y+1,mat)) q.push({x,y+1});
                if(isValid(x,y-1,mat)) q.push({x,y-1});
                mat[x][y] = 0;
            }
            steps++;
        }
	    return visit;
    }
};