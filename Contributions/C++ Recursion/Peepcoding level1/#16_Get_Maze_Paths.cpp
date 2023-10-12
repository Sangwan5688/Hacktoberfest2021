/* 
    TODO: Get Maze Paths
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
	    } else if(i >= n || j >= m) return new ArrayList<String>();
	    
	    List<String> list = new ArrayList<>();
	       
        List<String> l1 = pre(i+1,j,n,m);
        List<String> l2 = pre(i,j+1,n,m);
        
        for(String s : l1) list.add("h" + s);
        for(String s : l2) list.add("v" + s);
        
	    return list;
	}
}
