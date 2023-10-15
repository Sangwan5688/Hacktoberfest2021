/*
    TODO: Find All Anagrams in a String
    ? https://leetcode.com/problems/find-all-anagrams-in-a-string/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        map<char,int> curr, target;
        vector<int> ans;
        for(auto ch : p) target[ch]++;
        int have = 0, need = target.size(), n = s.size(), prev = 0;

        for(int i=0;i<n;i++) {
            curr[s[i]]++;
            if(target.find(s[i]) != target.end() and curr[s[i]] == target[s[i]]) 
                have++;

            // cout<<s.substr(prev, i - prev + 1)<<endl;
            while(have == need and prev < i) {
                if(i - prev + 1 == p.size()) ans.push_back(prev);
                curr[s[prev]]--;
                if(curr[s[prev]] == 0) curr.erase(s[prev]);
                if(target.find(s[prev]) != target.end() 
                    and curr[s[prev]] < target[s[prev]]) have--;
                prev++;
            }
            if(have == need) ans.push_back(prev);
            // cout<<s.substr(prev, i - prev + 1) <<" A"<<endl;
        }
        return ans;
    }
};

//! Java