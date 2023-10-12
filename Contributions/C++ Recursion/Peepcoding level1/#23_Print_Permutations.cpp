/* 
    TODO: Print Permutations
    ? https://practice.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1
 */

import java.util.*;

class Solution {
    public List<String> list = new ArrayList<>();
    public List<String> find_permutation(String str) {
        list.clear();
        pre(str, "");
        
        Set<String> st = new HashSet<>(list);
        list.clear();
        list.addAll(st);
        Collections.sort(list);
        
        return list;
    }
    public void pre(String str, String ds) {
        if(str.length() == 0) {
            list.add(ds);
            return;
        }
        
        for(int i=0;i<str.length();i++) {
            StringBuilder sb = new StringBuilder(str);
            sb.deleteCharAt(i);
            pre(sb.toString(),ds + str.charAt(i));
        }
    }
}