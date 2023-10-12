/* 
    TODO: Print Subsequence
    ? https://www.codingninjas.com/codestudio/problems/subsequences-of-string_985087
 */

import java.util.* ;
import java.io.*; 
import java.util.ArrayList;

class Solution {
    public static void pre(String str, String ds) {
        if(str.length() == 0) {
            StringBuilder sb = new StringBuilder(ds);
            sb.reverse();
            if(ds.length() != 0) System.out.print(sb.toString() + " ");
            // if(ds.length() != 0) System.out.print(ds + " ");
            return;
        }
        
        char ch = str.charAt(0);
        pre(str.substring(1), ch + ds);
        pre(str.substring(1), ds);
    }
    public static ArrayList<String> subsequences(String str) {
        pre(str,"");
        return new ArrayList<>();
    }
}