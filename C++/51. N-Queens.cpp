//https://leetcode.com/problems/n-queens/
//The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

//Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

//Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<int> flag(n, -1);
        dfs(n, 0, flag, res);
        return res;
    }
    
    void dfs(int n, int cur, vector<int> &flag, vector<vector<string>> &res) {
        if (cur == n) {
            vector<string> path;
            for (int i=0; i<n; i++) {
                string s(n, '.');
                for (int j=0; j<n; j++)
                    if (flag[i] == j) { s[j] = 'Q'; break; }
                path.push_back(s);
            }
            res.push_back(path);
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
            if (col==flag[i] || abs(col-flag[i])==abs(row-i))
                return false;
        return true;
    }
};
