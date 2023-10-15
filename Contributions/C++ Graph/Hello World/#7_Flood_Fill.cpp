/*
    TODO: Flood Fill
    ? https://leetcode.com/problems/flood-fill/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int source =0 , colors = 0;
    bool valid(int i, int j, vector<vector<bool>>& visit, vector<vector<int>>& image){
        return (i >= 0 and j >= 0 and i < image.size() and j < image[0].size() and !visit[i][j] and image[i][j] == source);
    }
    void dfs(int i, int j, vector<vector<bool>>& visit, vector<vector<int>>& image){
        visit[i][j] = true;
        if(image[i][j] == source) image[i][j] = colors;
        if(valid(i+1,j,visit,image)) dfs(i+1,j,visit,image);
        if(valid(i-1,j,visit,image)) dfs(i-1,j,visit,image);
        if(valid(i,j+1,visit,image)) dfs(i,j+1,visit,image);
        if(valid(i,j-1,visit,image)) dfs(i,j-1,visit,image);
    }
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        vector<vector<bool>> visit(image.size(),vector<bool> (image[0].size(),false));
        source = image[sr][sc];
        colors = color;
        dfs(sr,sc,visit,image);
        return image;
    }
};