# Problem Description:-https://leetcode.com/problems/longest-palindromic-substring/

class Solution:
    def helper(self, s, left, right):
        while left>=0 and right<len(s) and (s[left]==s[right]):
            left-=1
            right+=1
        return s[left+1:right]

    def longestPalindrome(self, s: str) -> str:
        ans = ""
        for i in range(len(s)):
            odd_pos = self.helper(s, i, i)
            even_pos = self.helper(s, i, i+1)
            ans = max(even_pos, odd_pos, ans, key=len)
        return ans
