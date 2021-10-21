import java.util.*;

public class RatInMaze {
	static int N = 4;

	public static void main(String[] args) {
		int[][] maze = { { 1, 0, 0, 0 }, { 1, 1, 0, 1 }, { 0, 1, 0, 0 }, { 1, 1, 1, 1 } };
		solvemaze(maze);
	}

	public static boolean solvemaze(int[][] maze) {
		int[][] sol = new int[N][N];

		if (solvemaze1(sol, 0, 0, maze) == false) {
			System.out.println("Not possible");
			return false;
		} else
			printres(sol);
		return true;
	}

	public static boolean solvemaze1(int[][] sol, int x, int y, int[][] maze) {
		if (x == N - 1 && y == N - 1 && maze[x][y] == 1) {
			sol[x][y] = 1;
			return true;
		}
		if (isSafe(maze, x, y)) {
			sol[x][y] = 1;
			if (solvemaze1(sol, x + 1, y, maze) == true)
				return true;
			if (solvemaze1(sol, x, y + 1, maze) == true)
				return true;

			sol[x][y] = 0;
		//	return false;

		}
		return false;

	}

	public static boolean isSafe(int[][] maze, int x, int y) {
		return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);
	}

	public static void printres(int[][] sol) {
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				System.out.print(sol[i][j] + " ");
			}
		System.out.println();
		}
		return;
	}

}
