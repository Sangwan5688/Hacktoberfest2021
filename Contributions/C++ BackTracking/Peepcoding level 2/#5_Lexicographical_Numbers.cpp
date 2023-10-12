/*
    TODO: Lexicographical Numbers
    ? https://leetcode.com/problems/lexicographical-numbers/
*/

class Solution {
    public List<Integer> ans = new ArrayList<>();
    public void pre(int i, int n) {
        if(i > n) return;
        ans.add(i);
        for(int rem=0; rem<=9; rem++) pre(i*10 + rem,n);
    }
    public List<Integer> lexicalOrder(int n) {
        ans.clear();
        for(int i=1;i<=9;i++) pre(i,n);
        return ans;
    }
}