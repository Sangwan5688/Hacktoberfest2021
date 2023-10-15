/*
    TODO: Repeated DNA Sequences
    ? https://leetcode.com/problems/repeated-dna-sequences/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        int n = s.size();
        unordered_map<string,int> mp;
        string temp = "";
        for(int i=0;i<min(10,n);i++) temp.push_back(s[i]);
        mp[temp]++;

        for(int i=10;i<s.size();i++) {
            temp.erase(temp.begin());
            temp.push_back(s[i]);
            mp[temp]++;
        }
        vector<string> ans;
        for(auto [str,cnt] : mp) {
            if(cnt > 1) ans.push_back(str);
        }
        return ans;
    }
};

//! Java