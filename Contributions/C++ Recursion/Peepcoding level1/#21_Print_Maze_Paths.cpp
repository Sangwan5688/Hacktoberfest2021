/* 
    TODO: Print Maze Paths
    ? https://www.onlinegdb.com/online_java_compiler
    ! "h" + ds
 */

import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		int m = sc.nextInt();
		pre(0,0,"",n,m);
	}
	public static void pre(int i, int j, String ds, int n, int m) {
	    if(i == n-1 && j == m-1) {
	        System.out.println(ds);
	        return;
	    } else if(i >= n || j >= m) return;
	       
        pre(i+1,j,ds + "h",n,m);
        pre(i,j+1,ds + "v",n,m);
	}
}