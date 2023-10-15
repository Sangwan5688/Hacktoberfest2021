/* 
    TODO: Check if a string is Isogram or not
    ? https://practice.geeksforgeeks.org/problems/check-if-a-string-is-isogram-or-not-1587115620/1
 */

#include "bits/stdc++.h"
using namespace std;

class Solution {
    public:
    bool isIsogram(string s) {
        unordered_map<char,int> mp;
        for(auto ch : s) {
            mp[ch]++;
            if(mp[ch] == 2) return false;
        }
        return true;
    }
};