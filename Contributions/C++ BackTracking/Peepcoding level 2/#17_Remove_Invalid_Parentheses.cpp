/* 
    TODO: Remove Invalid Parentheses
    ? https://leetcode.com/problems/remove-invalid-parentheses/
 */

//! TLE at "((()((s((((()"
class Solution {
    public List<String> list = new ArrayList<>();
    public HashSet<String> st = new HashSet<>();
    public int getMinToRemove(String s) {
        Stack<Character> st = new Stack<>();

        for(char ch : s.toCharArray()) {
            if(ch == '(') st.push(ch);
            else if(ch == ')'){
                if(st.size() == 0 || st.peek() == ')') st.push(')');
                else if(!st.empty() && st.peek() == '(') st.pop();
            }
        }
        return st.size();
    }
    public void pre(String s, int mn) {
        if(mn == 0) {
            if(getMinToRemove(s) == 0) {
                st.add(s);
            }
            return;
        }
        
        for(int i=0;i<s.length();i++) {
            char ch = s.charAt(i);
            if(ch != ')' && ch != '(') continue;
            StringBuilder sb = new StringBuilder(s);
            sb.deleteCharAt(i);
            // System.out.println(sb.toString());
            pre(sb.toString(), mn-1);
        }
    }
    public List<String> removeInvalidParentheses(String s) {
        list.clear();
        st.clear();
        int mn = getMinToRemove(s);
        pre(s, mn);

        for(String str : st) list.add(str);
        return list;
    }
}