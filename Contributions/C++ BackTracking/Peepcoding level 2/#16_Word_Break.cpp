/* 
    TODO: Word Break
    ? https://leetcode.com/problems/word-break/
 */

//! TLE
class Solution {
    public HashSet<String> st = new HashSet();  
    public boolean pre(String s) {
        int n = s.length();
        if(n == 0) return true;

        String tmp = "";
        for(int i=0;i<n;i++) {
            tmp += s.charAt(i);
            if(st.contains(tmp)) {
                if(pre(s.substring(i+1))) return true;
            }
        }
        return false;
    }
    public boolean wordBreak(String s, List<String> wordDict) {
        st.clear();
        for(String str : wordDict) st.add(str);
        return pre(s);
    }
}
