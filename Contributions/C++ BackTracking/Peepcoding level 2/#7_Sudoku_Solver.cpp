/*
    TODO: Sudoku Solver
    ? https://leetcode.com/problems/sudoku-solver/
    ! bool concept of solve && i, j in 3*3 matrix
    ! checking before while applying
    * if(isPossible(i,j,board)) {
            * if(solve(board)) return true;
        * } else board[i][j] = '.';
*/

class Solution {
    public boolean isPossible(int row, int col, char ch, char[][] board) {
        int n = board.length, m = board[0].length;
        // char ch = board[row][col];

        for(int j=0;j<m;j++) if(board[row][j] == ch) return false;
        for(int i=0;i<n;i++) if( board[i][col] == ch) return false;
        for(int k=0;k<9;k++) {
            int i = 3*(row/3) + k/3;
            int j = 3*(col/3) + k%3; 
            if(board[i][j] == ch) return false;
        }
        return true;
    }
    public boolean solve(char[][] board) {
        int n = board.length, m = board[0].length;

        for(int i=0;i<n;i++) {
            for(int j=0;j<m;j++) {
                if(board[i][j] != '.') continue;

                for(char ch='1';ch<='9';ch++) {
                    if(isPossible(i,j,ch,board)) {
                        board[i][j] = ch;
                        if(solve(board)) return true;
                        else board[i][j] = '.';
                    } 
                }
                return false;
            }
        }
        return true;
    }
    public void solveSudoku(char[][] board) {
        solve(board);
    }
}

//! failed
class Solution {
    public boolean isPossible(int row, int col, char[][] board) {
        int n = board.length, m = board[0].length;
        char ch = board[row][col];

        for(int j=0;j<m;j++) if(j != col && board[row][j] == ch) return false;
        for(int i=0;i<n;i++) if(i != row && board[i][col] == ch) return false;
        for(int k=0;k<9;k++) {
            int i = 3*(row/3) + k/3;
            int j = 3*(col/3) + k%3; 
            if(i != row && j != col) {
                if(board[i][j] == ch) return false;
            }
        }
        return true;
    }
    public void solveSudoku(char[][] board) {
        int n = board.length, m = board[0].length;

        for(int i=0;i<n;i++) {
            for(int j=0;j<m;j++) {
                if(board[i][j] != '.') continue;

                for(char ch='1';ch<='9';ch++) {
                    board[i][j] = ch;
                    if(isPossible(i,j,board)) {
                        break;
                    } else board[i][j] = '.';
                }
            }
        }
    }
}