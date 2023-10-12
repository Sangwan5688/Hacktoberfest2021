/*
    TODO: Verbal Arithmetic Puzzle
    ? https://leetcode.com/problems/verbal-arithmetic-puzzle/
    ! n*1L*10
    ! 0...9 -> 10 value , ~ 9 value
*/

//! all test case passed but still TLE
class Solution {
    public int[] mp;
    public HashSet<Character> st = new HashSet<>(), key = new HashSet<>();

    public boolean check(String[] words, String result) {
        long sumi = 0;
        for(String word : words) {
            long n = 0;
            for(char ch : word.toCharArray()) n = n*1L*10 + mp[ch - 'A'];
            sumi += n;
        }

        long n = 0;
        for(char ch : result.toCharArray()) n = n*1L*10 + mp[ch - 'A'];
        return (n == sumi);
    }
    public boolean pre(int ind, String unique, String[] words, String result, int[] visit) {
        if(ind == unique.length()) {
            if(check(words,result)) return true;
            else return false;
        }
        int i;
        if(key.contains(unique.charAt(ind))) i = 1;
        else i = 0;
        for(;i<=9;i++) {
            if(visit[i] == 0) {
                mp[unique.charAt(ind) - 'A'] = i;
                visit[i] = 1;
                if(pre(ind+1,unique, words, result, visit)) return true;
                visit[i] = 0;
                mp[unique.charAt(ind) - 'A'] = -1;
            }
        }
        return false;
    }
    public boolean isSolvable(String[] words, String result) {
        st.clear();
        mp = new int[26];
        for(int i=0;i<26;i++) mp[i] = -1;

        String unique = "";
        for(String word : words) {
            if(word.length() != 1) key.add(word.charAt(0));
            for(char ch : word.toCharArray()) {
                if(!st.contains(ch)) {
                    unique += ch;
                    st.add(ch);
                }
            }
        }
        if(result.length() != 1) key.add(result.charAt(0));
        for(char ch : result.toCharArray()) {
            if(!st.contains(ch)) {
                unique += ch;
                st.add(ch);
            }
        }
        // System.out.println(unique);
        if(unique.length() > 10) return false;
        boolean flag = pre(0, unique, words, result, new int[11]);
        for(int i=0;i<26;i++) {
            char ch = (char)('A' + i);
            System.out.println(ch + " " + mp[i]);
        }

        return flag;
    }
} 

//! TLE
class Solution {
    public int[] mp;
    public boolean check(String[] words, String result) {
        for(String word : words) 
            if(mp[word.charAt(0) - 'A'] == 0) 
                return false;
        if(mp[result.charAt(0) - 'A'] == 0) return false;

        long sumi = 0;
        for(String word : words) {
            long n = 0;
            for(char ch : word.toCharArray()) n = n*1L*10 + mp[ch - 'A'];
            sumi += n;
        }

        long n = 0;
        for(char ch : result.toCharArray()) n = n*1L*10 + mp[ch - 'A'];
        return (n == sumi);
    }
    public boolean pre(int ind, String unique, String[] words, String result, int[] visit) {
        if(ind == unique.length()) {
            if(check(words,result)) return true;
            else return false;
        }
        for(int i=0;i<=9;i++) {
            if(visit[i] == 0) {
                mp[unique.charAt(ind) - 'A'] = i;
                visit[i] = 1;
                if(pre(ind+1,unique, words, result, visit)) return true;
                visit[i] = 0;
                mp[unique.charAt(ind) - 'A'] = -1;
            }
        }
        return false;
    }
    public boolean isSolvable(String[] words, String result) {
        mp = new int[26];
        for(int i=0;i<26;i++) mp[i] = -1;

        String unique = "";
        HashSet<Character> st = new HashSet<>();
        for(String word : words) {
            for(char ch : word.toCharArray()) {
                if(!st.contains(ch)) {
                    unique += ch;
                    st.add(ch);
                }
            }
        }
        for(char ch : result.toCharArray()) {
            if(!st.contains(ch)) {
                unique += ch;
                st.add(ch);
            }
        }
        // System.out.println(unique);
        if(unique.length() > 10) return false;
        boolean flag = pre(0, unique, words, result, new int[11]);
        return flag;
    }
} 

//! TLE
class Solution {
    public boolean check(String[] words, String result, HashMap<Character, Integer> mp) {
        for(String word : words) if(mp.get(word.charAt(0)) == 0) return false;
        if(mp.get(result.charAt(0)) == 0) return false;

        long sumi = 0;
        for(String word : words) {
            long n = 0;
            for(char ch : word.toCharArray()) n = n*10 + mp.get(ch);
            sumi += n;
        }

        long n = 0;
        for(char ch : result.toCharArray()) n = n*10 + mp.get(ch);
        return (n == sumi);
    }
    public boolean pre(int ind, String unique, String[] words, String result, HashMap<Character, Integer> mp, int[] visit) {
        if(ind == unique.length()) {
            if(check(words,result,mp)) return true;
            else return false;
        }
        for(int i=0;i<=9;i++) {
            if(visit[i] == 0) {
                mp.put(unique.charAt(ind), i);
                visit[i] = 1;
                if(pre(ind+1,unique, words, result, mp, visit)) return true;
                visit[i] = 0;
                mp.put(unique.charAt(ind), -1);
            }
        }
        return false;
    }
    public boolean isSolvable(String[] words, String result) {
        HashMap<Character, Integer> mp = new HashMap<>();
        String unique = "";
        for(String word : words) {
            for(char ch : word.toCharArray()) {
                if(!mp.containsKey(ch)) {
                    mp.put(ch, -1);
                    unique += ch;
                }
            }
        }
        for(char ch : result.toCharArray()) {
            if(!mp.containsKey(ch)) {
                mp.put(ch, -1);
                unique += ch;
            }
        }
        if(unique.length() > 9) return false;
        boolean flag = pre(0, unique, words, result, mp, new int[10]);
        // for(var i : mp.entrySet()) {
        //     System.out.println(i.getKey() + " " + i.getValue());
        // }
        return flag;
    }
}