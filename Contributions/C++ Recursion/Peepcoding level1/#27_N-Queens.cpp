/* 
    TODO: N-Queens
    ? https://leetcode.com/problems/n-queens/
 */

class Solution {
    public List<List<String>> ans = new ArrayList<>();
    public void pre(int row, int[][] chess) {
        int n = chess.length;
        if(row == n) {
            List<String> list = new ArrayList<>();
            for(int i=0;i<n;i++) {
                String ds = "";
                for(int j=0;j<n;j++) {
                    if(chess[i][j] == 1) ds += "Q";
                    else ds += ".";
                }
                list.add(ds);
            }
            ans.add(list);
            return;
        }

        for(int col=0;col<n;col++) {
            if(check(row, col, chess)) {
                chess[row][col] = 1;
                pre(row + 1 , chess);
                chess[row][col] = 0;
            }
        }
    }
    public boolean check(int row, int col, int[][] chess) {
        int i = row, j = col, n = chess.length;
        while(i >= 0 && j >= 0) {
            if(chess[i][j] == 1) return false;
            i--; j--;
        }
        i = row; j = col;
        while(i >= 0 && j < n) {
            if(chess[i][j] == 1) return false;
            i--; j++;
        }
        i = row; j = col;
        while(i >= 0) {
            if(chess[i][j] == 1) return false;
            i--;
        }
        return true;
    }
    public List<List<String>> solveNQueens(int n) {
        ans.clear();
        int[][] chess = new int[n][n];
        pre(0, chess);
        return ans;
    }
}
