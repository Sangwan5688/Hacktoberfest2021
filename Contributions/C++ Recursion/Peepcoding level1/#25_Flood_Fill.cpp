/* 
    TODO: Flood Fill
    ? https://www.onlinegdb.com/online_java_compiler
    ? https://leetcode.com/problems/flood-fill/
 */

import java.util.*;
public class Main {
    public static int[][] matrix;
    public static void pre(int i, int j, String ds, int n, int m, int[][] visit) {
        if(i == n - 1 && j == m - 1) {
            System.out.println(ds);
            return;
        } else if(i >= n || j >= m || i < 0 || j < 0 || visit[i][j] == 1 || matrix[i][j] == 1) return;
        
        visit[i][j] = 1;
        
        pre(i+1,j,ds + "d",n,m,visit);
        pre(i-1,j,ds + "u",n,m,visit);
        pre(i,j+1,ds + "r",n,m,visit);
        pre(i,j-1,ds + "l",n,m,visit);
        
        visit[i][j] = 0;
    } 
	public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt(), x = 0;
        matrix = new int[n][m];
        
        for(int i=0;i<n;i++) for(int j=0;j<m;j++) { x = sc.nextInt(); matrix[i][j] = x; }
        
        for(int[] arr : matrix) {
            for(int ele : arr) {
                System.out.print(ele + " ");
            }
            System.out.println();
        }
        
        pre(0,0,"",n,m, new int[n][m]);
        
        sc.close();
	}
}