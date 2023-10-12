/*
    TODO: Replace O's with X's
    ? https://practice.geeksforgeeks.org/problems/replace-os-with-xs0052/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=replace-os-with-xs
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
public:
    bool isValid(int i, int j, vector<vector<char>>& mat) {
        return ((i >= 0) and (j >= 0) and (i < mat.size()) and 
            (j < mat[0].size()) and mat[i][j] == 'O');
    }
    void bfs(int i, int j, vector<vector<char>>& mat, vector<vector<bool>>& visit) {
        if(!isValid(i,j,mat)) return;
        visit[i][j] = true;
        mat[i][j] = 'X';
        bfs(i+1,j,mat,visit);
        bfs(i-1,j,mat,visit);
        bfs(i,j+1,mat,visit);
        bfs(i,j-1,mat,visit);
    }
    vector<vector<char>> fill(int n, int m, vector<vector<char>> mat){
        vector<vector<bool>> visit(n, vector<bool> (m,false));
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if((i == 0 or j == 0 or i == n-1 or j == m-1) 
                    and mat[i][j] == 'O'){
                    visit[i][j] = true;
                    bfs(i,j,mat,visit);
                }
            }
        }
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(visit[i][j]) mat[i][j] = 'O';
                else mat[i][j] = 'X';
            }
        }
        return mat;
    }
};