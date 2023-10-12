/*
    * Valid Sudoku
    ? https://leetcode.com/problems/valid-sudoku/description/
*/

class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        return solve(board);
    }
    bool solve(vector<vector<char>> &board){ 
        for(int i=0;i<board.size();i++){
            for(int j=0;j<board[0].size();j++){
                if(board[i][j] != '.'){
                    // if(isValid(i,j,board[i][j],board)) return false;
                    if(!check(board,i,j)) return false;
                }
            }
        }
        return true;
    }
    bool isValid(int row,int col,char ch,vector<vector<char>> &board){
        for(int i=0;i<9;i++){
            if(board[i][col] == ch and i != row) return false;
            if(board[row][i] == ch and i != col) return false;
        }
        int p = 3*(row/3);
        int q = 3*(col/3);
        for(int i=p;i<p+3;i++){
            for(int j=q;j<q+3;j++){
                if(i != row and j != col and board[i][j] == ch) return false;
            }
        }
        return true;
    }
    bool check(vector<vector<char>> &board,int row,int col){   
        char ch = board[row][col];
        for(int i=0;i<9;i++){
            if(i!=row and board[i][col] == ch) return false;
            if(i!=col and board[row][i] == ch) return false;
            int x = 3*(row/3)+(i/3), y = 3*(col/3)+(i%3);
            if(x!=row and y!=col and board[x][y] == ch) return false;
        }
//         int p = 3*(row/3), q = 3*(col/3);
//         for(int i=p;i<p+3;i++) 
//             for(int j=q;j<q+3;j++) 
//                 if(i!=row and j!=col and board[i][j] == ch)
//                     return false;
        
        return true;
    }
};