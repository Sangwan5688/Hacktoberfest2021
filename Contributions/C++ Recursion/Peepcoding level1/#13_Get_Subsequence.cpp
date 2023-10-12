/* 
    TODO: Get Subsequence
    ? https://www.codingninjas.com/codestudio/problems/subsequences-of-string_985087
 */

import java.util.* ;
import java.io.*; 
import java.util.ArrayList;

//! peepcoding
class Solution {
    public static ArrayList<String> pre(String str) {
        if(str.length() == 0) {
            ArrayList<String> list = new ArrayList<>();
            list.add("");
            return list;
        }
        char ch = str.charAt(0);
        String nStr = str.substring(1);
        ArrayList<String> list = pre(nStr);

        ArrayList<String> nList = new ArrayList<>();
        for(String s : list) nList.add(s + "");
        for(String s : list) nList.add(ch + s);
        return nList;
    }
    public static ArrayList<String> subsequences(String str) {
        ArrayList<String> list = pre(str);
        list.remove("");
        return list;
    }
}

//! striver
class Solution {
    public static ArrayList<String> list = new ArrayList<>();
    public static void pre(int index, String str, String ds) {
        if(index == str.length()) {
            if(ds.length() != 0) list.add(ds);
            return;
        }
        pre(index+1, str, ds);
        ds = ds + str.charAt(index);
        pre(index+1, str, ds);
       
    }
    public static ArrayList<String> subsequences(String str) {
        list.clear();
        pre(0,str,"");
        return list;
    }
}