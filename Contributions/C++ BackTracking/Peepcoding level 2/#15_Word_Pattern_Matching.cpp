/* 
    TODO: Word Pattern Matching
    ? https://www.onlinegdb.com/online_java_compiler
 */

import java.util.*;

public class Main {
    public static void pre(String s, String pattern, HashMap<Character, String> mp, String ds) {
        if(pattern.length() == 0) {
            if(s.length() == 0) {
                for(var i : mp.entrySet()) {    
                    System.out.println(i.getKey() + " " + i.getValue());
                }
                System.out.println(ds);
            }
            return;
        }
        
        char ch = pattern.charAt(0);
        String n_pattern = pattern.substring(1);
        
        if(mp.containsKey(ch)) {
            String tmp = mp.get(ch);
            int sz = tmp.length();
            
            if(s.length() >= sz) {
                String left_s = s.substring(0, sz);
                if(tmp.equals(left_s)) {
                    pre(s.substring(sz), n_pattern, mp, ds + ch);        
                }
            }
            
        } else {
            String tmp = "";
            for(int i=0;i<s.length();i++) {
                tmp += s.charAt(i);
                
                mp.put(ch, tmp);
                pre(s.substring(i+1), n_pattern, mp, ds + ch);
                mp.remove(ch);
            }   
        }
    }
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		String s = sc.nextLine();
		String pattern = sc.nextLine();
		HashMap<Character, String> mp = new HashMap<>();
		
		pre(s, pattern, mp, "");
	}
}


 //! Failed
import java.util.*;

public class Main {
    public static void pre(String ds, Character ch, String pattern, 
    String s, HashMap<String, Character> mp) {
        int n = s.length();
        if(n == 0) {
            if(ds == "pqp")
            System.out.println(ds);
            return;
        }
        
        String tmp = "";
        
        for(int i=0;i<n;i++) {
            tmp += s.charAt(i);    
            // System.out.println(tmp + "--");
            if(mp.containsKey(tmp)) {
                pre(ds + mp.get(tmp), ch, pattern, s.substring(i+1), mp); 
            } else {
                mp.put(tmp, ch);
                pre(ds + mp.get(tmp), (char)(ch + 1), pattern, s.substring(i+1), mp);
                mp.remove(tmp);
            }
        }
    }
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		String s = sc.nextLine();
		String pattern = sc.nextLine();
		HashMap<String, Character> mp = new HashMap<>();
		
		pre("", pattern.charAt(0), pattern, s, mp);
// 		System.out.println(s + " " + pattern);
	}
}
