/* 
    TODO: Print Stair Paths
    ? https://www.onlinegdb.com/online_java_compiler
 */

import java.util.*;

//! Sir
public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        getStairPaths(n,"");
    }

    public static void getStairPaths(int n, String ds) {
        if(n == 0) {
            System.out.println(ds);
            return;
        } else if(n < 0) return;
        
        getStairPaths(n-1,ds + "1");
        getStairPaths(n-2,ds + "2");
        getStairPaths(n-3,ds + "3");
    }
}

//! Mine
public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        getStairPaths(n,"");
    }
    public static void getStairPaths(int n, String ds) {
        if(n == 0) {
            System.out.println(ds);
            return;
        }
        
        if(n - 1 >= 0) {
            ds = ds + "1";
            getStairPaths(n-1,ds);
            if(ds.length() > 0) ds = ds.substring(0, ds.length() - 1);
        }
        
        if(n - 2 >= 0) {
            ds = ds + "2";
            getStairPaths(n-2,ds);
            if(ds.length() > 0) ds = ds.substring(0, ds.length() - 1);
        }
        
        if(n - 3 >= 0) {
            ds = ds + "3";
            getStairPaths(n-3,ds);
            if(ds.length() > 0) ds = ds.substring(0, ds.length() - 1);
        }
    }
}