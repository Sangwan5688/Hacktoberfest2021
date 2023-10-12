/* 
    TODO: Friends Pairing Problem 
    ? https://www.codingninjas.com/codestudio/problems/friends-pairing-problem_1214625
    ? https://practice.geeksforgeeks.org/problems/friends-pairing-problem5425/1
    ! ~ able to code
 */

import java.util.* ;
import java.io.*; 
public class Solution {
    public static int cnt = 0;
    public static int M = 1_000_000_007;
    public static void pre(int i, String ds, int n, boolean[] visit) {
        if(i > n) {
            System.out.println(ds.substring(0,ds.length() - 1));
            cnt = (cnt+1)%M;
            return;
        }
        if(visit[i]) {
            pre(i+1, ds, n, visit);
        } else {
            visit[i] = true;
            pre(i+1, ds + i + "-", n, visit);

            for(int k=i+1;k<=n;k++) {
                visit[k] = true;
                pre(i+1, ds + i + k + "-", n, visit);
                visit[k] = false;
            }

            visit[i] = false;
        }
    }
    public static int numberOfWays(int n) {
        cnt = 0;
        boolean[] visit = new boolean[n+1];
        pre(0,"",n,visit);
        return cnt - 1;
    }
}
