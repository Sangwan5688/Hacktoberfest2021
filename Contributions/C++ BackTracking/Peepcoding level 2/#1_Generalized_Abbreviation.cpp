/*
    TODO: Generalized Abbreviation 
    ? https://www.codingninjas.com/codestudio/problems/generalized-abbreviation_1233144
    ? https://www.lintcode.com/problem/779/
*/

import java.util.* ;
import java.io.*; 
import java.util.ArrayList;

public class Solution {
	public static ArrayList<String> ans = new ArrayList<>();
	public static void pre(int i, String ds, int cnt, char[] str) {
		if(i == 0) {
			if(cnt > 0) ds += cnt;
			StringBuilder sb = new StringBuilder(ds);
			sb.reverse();
			ans.add(sb.toString());
			return;
		}
		if(cnt > 0) pre(i-1, ds + cnt + str[i-1], 0, str);
		else pre(i-1, ds + str[i-1], 0, str);
		pre(i-1, ds, cnt + 1, str);
	}
	public static ArrayList < String > findAbbr(String str) {
		ans.clear();
		if(str.length() == 0) return ans;
		pre(str.length(), "", 0, str.toCharArray());
		Collections.sort(ans);
		return ans;	
	}
}