/*
    TODO: Minimum Number of Flips to Make the Binary String Alternating
    ? https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/
*/

#include "bits/stdc++.h"
using namespace std;

//! Navie
class Solution {
public:
    int minFlips(string s) {
        string s1,s2;
        for(int i=0;i<2*s.size();i++) {
            if(i&1) s1.push_back('1'), s2.push_back('0');
            else s1.push_back('0'), s2.push_back('1');
        }
        s = s + s;

        int k = s.size()/2, diff1 = 0, diff2 = 0, mi = 1e9, prev = 0;
        for(int i=0;i<k;i++) {
            if(s[i] != s1[i]) diff1++;
            if(s[i] != s2[i]) diff2++;
        }
        // cout<<diff1<<" "<<diff2<<endl;
        mi = min({mi,diff1,diff2});
        for(int i=k;i<s.size();i++) {
            if(s[prev] != s1[prev]) diff1--;
            if(s[prev] != s2[prev]) diff2--;

            if(s[i] != s1[i]) diff1++;
            if(s[i] != s2[i]) diff2++;
            mi = min({mi,diff1,diff2});
            // cout<<diff1<<" "<<diff2<<endl;
            prev++;
        }

        return mi;
    }
};

//! Brute 
class Solution {
public:
    int minFlips(string s) {
        string s1,s2;
        int n = s.size(), mi = 1e9, t = s.size();

        for(int i=0;i<s.size();i++) {
            if(i&1) s1.push_back('1'), s2.push_back('0');
            else s1.push_back('0'), s2.push_back('1');
        }

        // cout<<s1<<endl<<s2<<endl;

        while(t--) {
            int c1 = 0, c2 = 0;
            char ch = s.front();
            s.erase(s.begin());
            s.push_back(ch);

            for(int i=0;i<s.size();i++) {
                if(s[i] != s1[i]) c1++;
                if(s[i] != s2[i]) c2++;
            }
            
            mi = min({mi,c1,c2});
        }
        return mi;
    }
};

//! Java