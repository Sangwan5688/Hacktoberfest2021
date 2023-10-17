public class KnightsTour {
    static int N = 8;

    static boolean isSafe(int x, int y, int sol[][]) {
        return (x >= 0 && x < N && y >= 0 && y < N && sol[x][y] == -1);
    }

    static void printSolution(int sol[][]) {
        for (int x = 0; x < N; x++) {
            for (int y = 0; y < N; y++) {
                System.out.print(sol[x][y] + " ");
            }
            System.out.println();
        }
    }

    static boolean solveKT() {
        int sol[][] = new int[N][N];

        // Initialization of solution matrix
        for (int x = 0; x < N; x++)
            for (int y = 0; y < N; y++)
                sol[x][y] = -1;

        // xMove[] and yMove[] define the next move of Knight.
        // xMove[] is for next value of x coordinate
        // yMove[] is for next value of y coordinate
        int xMove[] = {2, 1, -1, -2, -2, -1, 1, 2};
        int yMove[] = {1, 2, 2, 1, -1, -2, -2, -1};

        // Since the Knight is initially at the first block
        sol[0][0] = 0;

        // Step counter for knight's position
        int step = 1;

        // Check if solution exists or not
        if (!solveKTUtil(0, 0, sol, xMove, yMove, step)) {
            System.out.println("Solution does not exist");
            return false;
        } else
            printSolution(sol);

        return true;
    }

    static boolean solveKTUtil(int x, int y, int sol[][], int xMove[], int yMove[], int step) {
        if (step == N * N)
            return true;

        for (int k = 0; k < 8; k++) {
            int nextX = x + xMove[k];
            int nextY = y + yMove[k];
            if (isSafe(nextX, nextY, sol)) {
                sol[nextX][nextY] = step;
                if (solveKTUtil(nextX, nextY, sol, xMove, yMove, step + 1))
                    return true;
                else
                    sol[nextX][nextY] = -1; // backtracking
            }
        }
        return false;
    }

    public static void main(String args[]) {
        solveKT();
    }
}
