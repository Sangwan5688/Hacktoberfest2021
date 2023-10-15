/* 
    TODO: Get Stairs Path
    ? https://www.onlinegdb.com/online_java_compiler
 */

import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<String> list = getStairPaths(n);
        System.out.println(list);
    }

    public static ArrayList<String> getStairPaths(int n) {
        if(n == 0) {
            ArrayList<String> list = new ArrayList<>();
            list.add("");
            return list;
        }
        
        ArrayList<String> list = new ArrayList<>();
        
        if(n - 1 >= 0) {
            ArrayList<String> l1 = getStairPaths(n-1);
            for(String s : l1) list.add("1" + s);
        }
        
        if(n - 2 >= 0) {
            ArrayList<String> l1 = getStairPaths(n-2);
            for(String s : l1) list.add("2" + s);
        }
        
        if(n - 3 >= 0) {
            ArrayList<String> l1 = getStairPaths(n-3);
            for(String s : l1) list.add("3" + s);
        }
        return list;
    }
}
