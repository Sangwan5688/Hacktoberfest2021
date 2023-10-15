/*
    TODO: Maximum Score Words Formed by Letters
    ? https://leetcode.com/problems/maximum-score-words-formed-by-letters/
*/

class Solution {
    public int[] mp;
    public int pre(int ind, String[] words, int[] score) {
        if(ind == words.length) return 0;

        int take = 0, count = 0, dtake = 0, flag = 1;
        String word = words[ind];
        for(char ch : word.toCharArray()) {
            if(mp[ch - 'a'] == 0) flag = 0;
            mp[ch - 'a']--;
            // mp[ch]--;
            count += score[ch - 'a'];
        }

        if(flag == 1) take = count + pre(ind + 1, words, score);
        for(char ch : word.toCharArray()) mp[ch - 'a']++;

        dtake = pre(ind+1, words, score);

        return Math.max(take, dtake);
    }
    public int maxScoreWords(String[] words, char[] letters, int[] score) {
        mp = new int[26];
        for(char ch : letters) mp[ch - 'a']++;
        for(int i : mp) System.out.print(i + " ");
        return pre(0, words, score);
    }
}

