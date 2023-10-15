/* 
    TODO: Palindrome Permutation 
    ? https://practice.geeksforgeeks.org/problems/pallindrome-patterns0809/1
    ? https://www.codingninjas.com/codestudio/problems/palindrome-permutation_1171180
 */

//! C++
class Solution {
public:
    char middle = '-';
    vector<string> ans;
    void pre(string ds, int n, map<char,int> mp) {
        for(auto &i : mp) if(i.second == 0) mp.erase(i.first);
        
        if(mp.size() == 0) {
            // cout<<ds<<endl;
            
            string s = ds;
            if(middle != '-') ds.push_back(middle);
            reverse(ds.begin(), ds.end());
            s += ds;
            
            if(isPali(s) and s.size() == n) ans.push_back(s);
            return;
        }
        
        for(auto &i : mp) {
            string ch(1, i.first);
            
            mp[i.first]--;
            pre(ds + ch, n, mp);
            mp[i.first]++;
        }
    }
    bool isPali(string s) {
        int low = 0, high = s.size() - 1;
        while(low <= high) if(s[low++] != s[high--]) return false;
        return true;
    }
	vector<string> all_plaindromes(string s) {
	    middle = '-';
	    ans.clear();
	    map<char,int> mp;
	    for(auto ch : s) mp[ch]++;
	    
        set<char> st;
        for(auto &i : mp) {
            if(i.second&1) {
                middle = i.first;
                i.second--;
                if(i.second == 0) st.insert(i.first);
                else i.second /= 2;
            } else i.second /= 2;
        }
        
        for(auto ch : st) mp.erase(ch);
	    pre("", s.size(), mp);
	    return ans;
	}
};

//! Java
import java.io.*;
import java.util.*;

public class Main {
    static boolean isPalindrome(String str) {
        int i = 0, j = str.length() - 1;
        while (i < j) {
            if (str.charAt(i) != str.charAt(j)) return false;
            i++; j--;
        }
        return true;
    }

    static int f=0;
	public static void generatepw(int cs, int ts, HashMap<Character, Integer> fmap, Character oddc, String asf) {
		if(cs==ts){
		    if(isPalindrome(asf)){
		        System.out.println(asf);
		        f=1;
		    }
		    return;
		}
        Set<Character> a = new HashSet<Character>();
        a=fmap.keySet();
        for(char s:a){
            for(int i=0;i<fmap.get(s);i++){
                fmap.put(s,fmap.get(s)-(i+1));
                generatepw(cs+1,ts,fmap,oddc,asf+s);
                fmap.put(s,fmap.get(s)+(i+1));
            }
        }
	}
	public static void main(String[] args) {
		Scanner scn = new Scanner(System.in);
		String str = scn.next();
		HashMap<Character, Integer> fmap = new HashMap<>();
		for (int i = 0; i < str.length(); i++) {
			char ch = str.charAt(i);
			fmap.put(ch, fmap.getOrDefault(ch, 0) + 1);
		}
        generatepw(0,str.length(),fmap,'a',"");
        if(f!=1) System.out.println(-1);
	}
}