/*
    * N-Queens II
    ? https://leetcode.com/problems/n-queens-ii/
*/
class Solution {
    public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> ans;
        vector<string> board(n);
        string s(n,'.');
        for(auto &i : board) i = s;
        
        vector<int> leftRow(n,0),upperDiagonal(2*n-1,0),lowerDiagonal(2*n-1,0);

        solve(0,board,ans,n,leftRow,upperDiagonal,lowerDiagonal);
        return ans.size();
    }
    void solve(int col,vector<string> &board,vector<vector<string>> &ans,int n
              ,vector<int>& leftRow,vector<int>& upperDiagonal,vector<int>& lowerDiagonal){
        if(col == n){
            ans.push_back(board);
            return;
        }
        for(int row = 0;row < n;row++){
            if(leftRow[row] == 0 and lowerDiagonal[row+col] == 0 and upperDiagonal[(n-1) + col - row] == 0){
                board[row][col] = 'Q';
                leftRow[row] = 1;
                lowerDiagonal[row+col] = 1;
                upperDiagonal[(n-1) + col - row] = 1;
                solve(col+1,board,ans,n,leftRow,upperDiagonal,lowerDiagonal);
                leftRow[row] = 0;
                lowerDiagonal[row+col] = 0;
                upperDiagonal[(n-1) + col - row] = 0;
                board[row][col] = '.';
            }
        }
    }
};