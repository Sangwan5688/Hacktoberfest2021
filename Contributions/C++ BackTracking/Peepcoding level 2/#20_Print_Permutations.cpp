/* 
    TODO: Permutations of a given string
    ? https://practice.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1
 */

class Solution {
    public HashSet<String> st = new HashSet<>();
    public void pre(int idx, char[] s, char[] ds) {
        int n = s.length;
        if(idx == n) {
            st.add(new String(ds));
            return;
        }
        
        for(int i=0;i<n;i++) {
            if(ds[i] == '-') {
                ds[i] = s[idx];
                pre(idx+1, s, ds);
                ds[i] = '-'; 
            }
        } 
    }
    public List<String> find_permutation(String s) {
        st.clear();
        int n = s.length();
        char[] ds = new char[n];
        Arrays.fill(ds, '-');
        pre(0, s.toCharArray(), ds);
        List<String> ans = new ArrayList<>(st);
        Collections.sort(ans);
        return ans;
    }
}