/* 
    TODO: Tug of War 
    ? https://www.codingninjas.com/codestudio/problems/tug-of-war_985253
 */

import java.util.* ;
import java.io.*; 
import java.util.ArrayList;

public class Solution {
	public static int mini = 1000000007;
	public static void pre(int i, ArrayList<Integer> s1, ArrayList<Integer> s2, ArrayList<Integer> arr, int n) {
		if(i == n) {
			if(n%2 == 1) {
				if(s1.size() + 1 == s2.size() || s1.size() == s2.size() + 1) {
					int sum1 = 0, sum2 = 0;
					for(Integer j : s1) sum1 += j;
					for(Integer j : s2) sum2 += j;

					int val = Math.abs(sum1 - sum2);
					mini = Math.min(mini, val);
				}
			} else {
				if(s1.size() == s2.size()) {
					int sum1 = 0, sum2 = 0;
					for(Integer j : s1) sum1 += j;
					for(Integer j : s2) sum2 += j;

					int val = Math.abs(sum1 - sum2);
					mini = Math.min(mini, val);
				}
			}
			return;
		}

		s1.add(arr.get(i));
		pre(i+1, s1, s2, arr, n);
		s1.remove(s1.size() - 1);
		
		s2.add(arr.get(i));
		pre(i+1, s1, s2, arr, n);
		s2.remove(s2.size() - 1);
	}
	public static int tugOfWar(ArrayList<Integer> arr, int n) {
		mini = 1000000007;
		pre(0, new ArrayList<>(), new ArrayList<>(), arr, n);
		return mini;
	}
}