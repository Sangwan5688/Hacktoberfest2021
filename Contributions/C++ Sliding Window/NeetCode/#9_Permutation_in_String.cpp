/*
    TODO: Permutation in String
    ? https://leetcode.com/problems/permutation-in-string/
*/

#include "bits/stdc++.h"
using namespace std;

//! O(n) 
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        map<char,int> curr, target;
        for(auto ch : s1) target[ch]++;
        int prev = 0, have = 0, need = target.size();

        for(int i=0;i<s2.size();i++) {
            curr[s2[i]]++;
            if(target.find(s2[i]) != target.end() and curr[s2[i]] == target[s2[i]])
                have++;

            if(have < need) continue;

            if(have == need and (i - prev + 1) == s1.size()) return true;
            while(have == need and prev < i) {
                if(have == need and (i - prev + 1) == s1.size()) return true;
                curr[s2[prev]]--;
                if(target.find(s2[prev]) != target.end() 
                    and curr[s2[prev]] < target[s2[prev]]) have--;
                prev++;
            }
            if(have == need and (i - prev + 1) == s1.size()) return true;
        }
        return false;
    }
};

//! O(26*n)
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        if(s1.size() > s2.size()) return false;

        map<char,int> target, curr;
        for(auto ch : s1) target[ch]++;

        int have = 0, need = target.size(), prev = 0, k = s1.size(), n = s2.size();
        for(int i=0;i<k;i++) {
            curr[s2[i]]++;
            if(target.find(s2[i]) != target.end() 
                and curr[s2[i]] == target[s2[i]]) have++;
        }
        if(curr == target) return true;

        for(int i=k;i<n;i++) {
            curr[s2[prev]]--;
            if(curr[s2[prev]] == 0) curr.erase(s2[prev]);
            curr[s2[i]]++;

            if(curr == target) return true;
            prev++;
        }
        return false;
    }
};

//! Java