import java.util.LinkedList;
import java.util.Queue;

public class Day_09_Rotten_Orange {
    // 1. BFS Solution
    class Solution {
        public int orangesRotting(int[][] grid) {
            Queue<int[]> q = new LinkedList();

            int freshCount = 0;
            for (int i = 0; i < grid.length; i++) {
                for (int j = 0; j < grid[0].length; j++) {
                    if (grid[i][j] == 2)
                        q.add(new int[]{i, j}); // add all rotten orange indices pair in queue
                    if (grid[i][j] == 1)
                        freshCount++; // count fresh oranges
                }
            }

            int[][] direction = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}}; // defined 4 direction 2d-array
            int time = 0;
            while (!q.isEmpty() && freshCount > 0) {
                time++;
                int size = q.size();
                while (size-- > 0) {
                    int[] xy = q.poll(); // poll rotten oranges from queue
                    for (int[] d : direction) {
                        int x = xy[0] + d[0];
                        int y = xy[1] + d[1];
                        // continue if x or y out of grid or grid don't have fresh orange
                        if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] == 0 || grid[x][y] == 2)
                            continue;
                        q.add(new int[]{x, y}); // add indices pair of fresh orange in queue
                        grid[x][y] = 2; // mark fresh orange to rotten - kind of marking visited
                        freshCount--; // decrease freshCount
                    }
                }
            }

            return freshCount == 0 ? time : -1;
        }
    }
}
