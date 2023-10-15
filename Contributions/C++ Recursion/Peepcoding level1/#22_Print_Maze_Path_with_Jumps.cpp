/* 
    TODO: Print Maze Path with Jumps 
    ? https://www.onlinegdb.com/online_java_compiler
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
	        System.out.print(ds + " ");
	        return;
	    } else if(i >= n || j >= m) return;
	    
	    for(int k=1;k<=n;k++) pre(i+k,j,ds + "h",n,m);
	    for(int k=1;k<=m;k++) pre(i,j+k,ds + "v",n,m);
	    for(int k=1;k<=Math.min(n,m);k++) pre(i+k,j+k,ds + "d",n,m);
	}
}