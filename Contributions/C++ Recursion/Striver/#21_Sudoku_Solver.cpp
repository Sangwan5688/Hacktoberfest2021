/*
    * Sudoku Solver
    ? https://leetcode.com/problems/sudoku-solver/
*/
class Solution {
    public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
    bool solve(vector<vector<char>>& board){
        for(int i=0;i<board.size();i++){
            for(int j=0;j<board[i].size();j++){
                if(board[i][j] == '.'){
                    for(char c='1';c<='9';c++){
                        if(isValid(i,j,c,board)){
                            board[i][j] = c;
                            if(solve(board)) return true;
                            else board[i][j] = '.';
                        }   
                    }   
                    return false;
                }
            }
        }
        return true;
    }
    
    bool isValid(int row,int col,char ch,vector<vector<char>> &board){
        for(int i=0;i<9;i++){
            if(board[i][col] == ch) return false;
            if(board[row][i] == ch) return false;
            if(board[3*(row/3) + i/3][3*(col/3) + i%3] == ch) return false;
        }
        return true;
    }
};
