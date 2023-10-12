/*
    TODO: Shortest Distance in a Binary Maze
    ? https://practice.geeksforgeeks.org/problems/shortest-path-in-a-binary-maze-1655453161/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=shortest-path-in-a-binary-maze
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    bool isValid(int x, int y, vector<vector<int>>& grid){
        return ((x >= 0) and (x < grid.size()) and (y >= 0) and (y < grid[0].size()) and grid[x][y]);
    }
    int shortestPath(vector<vector<int>> &grid, pair<int, int> source,
                     pair<int, int> dest) {
        queue<pair<int,pair<int,int>>> st;
        st.push({0,source});
        
        while(!st.empty()){
            int step = st.front().first;
            int x = st.front().second.first, y = st.front().second.second;
            // cout<<x<<" "<<" "<<y<<endl;
            
            st.pop();
            if(!isValid(x,y,grid)) continue;
            if(x == dest.first and y == dest.second) return step;
            grid[x][y] = 0;
            
            st.push({step+1,{x+1,y}});
            st.push({step+1,{x-1,y}});
            st.push({step+1,{x,y+1}});
            st.push({step+1,{x,y-1}});
        }
        return -1;
    }
};
