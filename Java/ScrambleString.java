class Solution {
    // to store previously computed substrings
    Map<String, Boolean> map = new HashMap<>();

    public boolean isScramble(String s1, String s2) {
        int n = s1.length();
        // check if the two strings are equal
        if (s1.equals(s2)) {
            return true;
        }
        // initialize frequency arrays for s1, s2, and current substring
        int[] a = new int[26], b = new int[26], c = new int[26];
        // check if the current substring has already been computed
        if (map.containsKey(s1 + s2)) {
            return map.get(s1 + s2);
        }
        // check all possible splits of the two strings
        for (int i = 1; i <= n - 1; i++) {
            int j = n - i;
            // update frequency arrays for s1, s2, and current substring
            a[s1.charAt(i - 1) - 'a']++;
            b[s2.charAt(i - 1) - 'a']++;
            c[s2.charAt(j) - 'a']++;
            // check if the current substring has the same characters
            if (Arrays.equals(a, b) && isScramble(s1.substring(0, i), s2.substring(0, i)) && isScramble(s1.substring(i), s2.substring(i))) {
                // if the substrings are scrambled versions of each other, return true
                map.put(s1 + s2, true);
                return true;
            }
            // check if the current substring and its complement have the same characters
            if (Arrays.equals(a, c) && isScramble(s1.substring(0, i), s2.substring(j)) && isScramble(s1.substring(i), s2.substring(0, j))) {
                // if the substrings are scrambled versions of each other, return true
                map.put(s1 + s2, true);
                return true;
            }
        }
        // if none of the splits result in scrambled versions, return false
        map.put(s1 + s2, false);
        return false;
    }
}
