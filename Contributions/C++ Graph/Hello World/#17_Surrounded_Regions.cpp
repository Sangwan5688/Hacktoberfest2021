/*
    TODO: Surrounded Regions
    ? https://leetcode.com/problems/surrounded-regions/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool isValid(int i,int j, vector<vector<bool>>& visit, vector<vector<char>> &board){
        return ((i >= 0) and (j >= 0) and (i < board.size()) and (j < board[i].size()) and (!visit[i][j]) and (board[i][j] == 'O'));
    }
    void pre(int i,int j, vector<vector<bool>>& visit, vector<vector<char>> &board){
        if(!isValid(i,j,visit,board)) return;
        visit[i][j] = true;
        pre(i+1,j,visit,board);
        pre(i-1,j,visit,board);
        pre(i,j+1,visit,board);
        pre(i,j-1,visit,board);
    }
    void solve(vector<vector<char>>& board) {
        int n = board.size(), m = board[0].size();
        vector<vector<bool>> visit(n+1,vector<bool> (m+1,false));
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if((i == 0) or (j == 0) or (i == n-1) or (j == m-1)){
                    if(board[i][j] == 'O' and visit[i][j] == false){
                        pre(i,j,visit,board);
                    }
                }
            }
        }   
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(visit[i][j]) board[i][j] = 'O';
                else board[i][j] = 'X';
            }
        }
    }
};