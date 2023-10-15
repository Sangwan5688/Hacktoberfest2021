/*
    TODO: Path with Maximum Gold
    ? https://leetcode.com/problems/path-with-maximum-gold/
*/

class Solution {
    public int[][] visit;
    public int ans = 0;
    public boolean isValid(int i, int j, int[][] grid, int[][] visit) {
        return i >= 0 && j >= 0 && i < grid.length && j < grid[0].length && grid[i][j] != 0 && visit[i][j] == 0;
    }
    public void pre(int i, int j, int cost, int[][] grid, int[][] visit) {
        if(!isValid(i,j,grid,visit)) {
            ans = Math.max(ans,cost);
            return;
        }
        visit[i][j] = 1;
        cost += grid[i][j];
        pre(i+1,j,cost,grid,visit);
        pre(i-1,j,cost,grid,visit);
        pre(i,j+1,cost,grid,visit);
        pre(i,j-1,cost,grid,visit);
        cost -= grid[i][j];
        visit[i][j] = 0;
    }
    public int getMaximumGold(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        visit = new int[n][m];

        for(int i=0;i<n;i++) {
            for(int j=0;j<m;j++) {
                if(grid[i][j] == 0) continue;
                pre(i,j,0,grid,visit);
            }
        }
        return ans;
    }
}