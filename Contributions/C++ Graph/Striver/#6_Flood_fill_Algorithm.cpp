/*
    TODO: Flood fill Algorithm
    ? https://practice.geeksforgeeks.org/problems/flood-fill-algorithm1856/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=flood-fill-algorithm
*/

#include "bits/stdc++.h"
using namespace std;

//! gfg bfs
class Solution {
public:
    vector<vector<bool>> visit;
    int n,m,color,old;
    bool isValid(int i,int j, vector<vector<int>>& image) {
        return ((i >= 0) and (j >= 0) and (i < image.size()) and (j < image[0].size()) 
        and (image[i][j] == old) and !visit[i][j]);
    }
    void bfs(int r,int c, vector<vector<int>>& image){
        if(!isValid(r,c,image)) return;
        visit[r][c] = true;
        if(image[r][c] == old)
            image[r][c] = color;
        bfs(r+1,c,image);
        bfs(r-1,c,image);
        bfs(r,c+1,image);
        bfs(r,c-1,image);
    }
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        n = image.size(), m = image[0].size();
        visit.resize(n, vector<bool> (m,false));
        color = newColor;
        old = image[sr][sc];
        bfs(sr,sc,image);
        return image;
    }
};