/* 
    TODO: Get Maze Paths with Jump
    ? https://www.onlinegdb.com/online_java_compiler
 */

import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		int m = sc.nextInt();
		List<String> list = pre(0,0,n,m);
		System.out.println(list);
	}
	public static List<String> pre(int i, int j, int n, int m) {
	    if(i == n-1 && j == m-1) {
	        List<String> list = new ArrayList<>();
	        list.add("");
	        return list;
	    } else if(i >= n || j >= m) return new ArrayList<>();
	    
	    List<String> list = new ArrayList<>();
	    
	    for(int k=1;k<=n;k++) {
            List<String> t = pre(i+k,j,n,m);
            for(String s : t) list.add("h" + s);
	    }
	    for(int k=1;k<=m;k++) {
	        List<String> t = pre(i,j+k,n,m);
	        for(String s : t) list.add("v" + s);
	    }
	    for(int k=1;k<=Math.min(n,m);k++) {
	        List<String> t = pre(i+k,j+k,n,m);
	        for(String s : t) list.add("d" + s);
	    }
	    return list;
	}
}