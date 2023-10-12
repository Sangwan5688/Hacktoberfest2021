/* 
    TODO: Print Keypad Combination
    ? https://www.onlinegdb.com/online_java_compiler
 */

class Solution {
    public void pre(String digits, String ds, HashMap<Integer, String> mp) {
        if(digits.length() == 0) {
            System.out.println(ds);
            return;
        }

        char ch = digits.charAt(0);
        char[] arr = mp.get(ch - '0').toCharArray();

        for(char c : arr) pre(digits.substring(1),ds + c, mp);
    }
    public int countTexts(String digits) {
        if(digits.length() == 0) return 0;
        HashMap<Integer, String> mp = new HashMap<>();
        mp.put(2, "abc");mp.put(3, "def");mp.put(4, "ghi");
        mp.put(5, "jkl");mp.put(6, "mno");mp.put(7, "pqrs");
        mp.put(8, "tuv");mp.put(9, "wxyz");
        pre(digits, "", mp);
        return 0;
    }
}