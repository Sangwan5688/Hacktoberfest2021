//https://leetcode.com/problems/n-queens-ii/
//The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

//Given an integer n, return the number of distinct solutions to the n-queens puzzle.

class Solution {
public:
    int totalNQueens(int n) {
        int res = 0;
        vector<int> flag(n, -1);
        dfs(n, 0, flag, res);
        return res;
    }
    
    void dfs(int n, int cur, vector<int> &flag, int &res) {
        if (cur == n) {
            res ++;
            return;
        }
        for (int col=0; col<n; col++) {
            if (!is_valid(cur, col, flag))  continue;
            flag[cur] = col;
            dfs(n, cur+1, flag, res);
            flag[cur] = -1;
        }
    }
    
    bool is_valid(int row, int col, vector<int> &flag) {
        for (int i=0; i<row; i++) 
            if (col==flag[i] || abs(i-row)==abs(flag[i]-col))
                return false;
        return true;
    }
};
