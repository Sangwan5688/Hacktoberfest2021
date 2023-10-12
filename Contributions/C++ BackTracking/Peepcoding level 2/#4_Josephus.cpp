/*
    TODO: Josephus 
    ? https://practice.geeksforgeeks.org/problems/josephus-problem/1
    ? https://www.codingninjas.com/codestudio/problems/josephus_1214938
*/

import java.util.* ;
import java.io.*; 
public class Solution {
    
    public static int pre(int n, int k) {
        if(n == 1) return 0;
        int x = pre(n-1,k);
        int y = (x+k)%n;
        return y;
    }
    public static int josephus(int n, int k) {
        return pre(n,k) + 1;
    }
}
