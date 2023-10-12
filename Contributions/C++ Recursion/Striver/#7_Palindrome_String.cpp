/*  
    * Palindrome String
	? https://practice.geeksforgeeks.org/problems/palindrome-string0817/1
*/
class Solution{
    public:	
	bool check(int i,string s){
	    if(i >= s.size() - i - 1) return true;
	    if(s[i] != s[s.size() - i - 1]) return false;
	    return check(i+1,s);
	}
	int isPalindrome(string s){
	    return check(0,s);
	}
};
