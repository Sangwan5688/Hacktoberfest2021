/*  
    * Reverse String
    ? https://leetcode.com/problems/reverse-string/
*/
class Solution {
    public:
    void reverseStr(int i,vector<char>& s){
        if(i >= s.size() - i - 1) return;
        swap(s[i],s[s.size() - i - 1]);
        reverseStr(i+1,s);
    }
    void reverseString(vector<char>& s) {
        reverseStr(0,s);
    }
};
