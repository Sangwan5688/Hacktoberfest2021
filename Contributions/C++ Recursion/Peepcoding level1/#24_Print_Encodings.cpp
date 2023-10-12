/* 
    TODO: Print Encodings
    ? https://leetcode.com/problems/decode-ways/
    ! TLE
 */

class Solution {
    public HashMap<Integer, String> mp = new HashMap<>();
    public int cnt = 0;
    public void pre(String s, String ds) {
        if(s.length() == 0) {
            if(ds.length() != 0) {
                // System.out.println(ds + ds.length() + ("null" == ds));
                cnt++;
            }
            return;
        } else if(s.length() != 0 && s.charAt(0) == '0') return;

        int n = s.length(), no = 0;
        for(int i=0;i<n;i++) {
            if(no <= 26) {
                no = no*10 + (s.charAt(i) - '0');
                if(mp.containsKey(no)) 
                    pre(s.substring(i+1), ds + mp.get(no));
            } else break;
        }
    }
    public int numDecodings(String s) {
        cnt = 0;
        mp.clear();
        char ch = 'a';
        for(int i=1;i<=26;i++) {
            mp.put(i,String.valueOf(ch));
            ch++;
        }
        pre(s, "");
        return cnt;
    }
}