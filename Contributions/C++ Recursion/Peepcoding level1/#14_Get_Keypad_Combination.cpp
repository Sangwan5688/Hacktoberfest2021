/* 
    TODO: Get Keypad Combination
    ? https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 */

class Solution {
    public List<String> pre(String digits, HashMap<Integer, String> mp) {
        if(digits.length() == 0) {
            List<String> list = new ArrayList<>();
            list.add("");
            return list;
        }

        char ch = digits.charAt(0);
        String nStr = digits.substring(1);
        List<String> list = pre(nStr, mp);
        
        List<String> nList = new ArrayList<>();
        char[] suggest = mp.get(ch - '0').toCharArray();
        System.out.println(suggest);

        for(char c : suggest) {
            for(String s : list) {
                nList.add(c + s);
            }
        }
        return nList;
    }
    public List<String> letterCombinations(String digits) {
        if(digits.length() == 0) return new ArrayList<String>();

        HashMap<Integer, String> mp = new HashMap<>();
        mp.put(2, "abc");mp.put(3, "def");mp.put(4, "ghi");
        mp.put(5, "jkl");mp.put(6, "mno");mp.put(7, "pqrs");
        mp.put(8, "tuv");mp.put(9, "wxyz");
        return pre(digits, mp);
    }
}