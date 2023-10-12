/*
    TODO: N-Queens
    ? https://leetcode.com/problems/n-queens/
*/

class Solution {
    public List<List<String>> ans = new ArrayList<>();
    public void pre(int row, int[] column, int[] upper, int[] lower, int[][] visit, int n) {
        if(row == n) {
            List<String> ds = new ArrayList<>();
            for(int i=0;i<n;i++) {
                String s = "";
                for(int j=0;j<n;j++) {
                    if(visit[i][j] == 1) s += "Q";
                    else s += ".";
                }
                ds.add(s);
            }
            ans.add(ds);
        }

        for(int col=0;col<n;col++) {
            if((column[col] == 1) || (upper[row + col] == 1) || (lower[n - 1 + row - col] == 1))
                continue;

            column[col] = 1;
            upper[row + col] = 1;
            lower[n-1 + row - col] = 1;

            visit[row][col] = 1;
            pre(row+1,column,upper,lower,visit,n);
            visit[row][col] = 0;

            column[col] = 0;
            upper[row + col] = 0;
            lower[n-1 + row - col] = 0;
        }
    }
    public List<List<String>> solveNQueens(int n) {
        ans.clear();
        int[] col = new int[n];      // |
        int[] upper = new int[2*n-1]; // /
        int[] lower = new int[2*n-1]; // \
        pre(0,col,upper,lower, new int[n][n],n);
        return ans;
    }
}