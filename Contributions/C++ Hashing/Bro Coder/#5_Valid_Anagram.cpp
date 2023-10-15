/* 
    TODO: Valid Anagram
    ? https://www.interviewbit.com/old/problems/anagrams/
    ? https://leetcode.com/problems/group-anagrams/

    ? https://leetcode.com/problems/valid-anagram/
 */

#include "bits/stdc++.h"
using namespace std;

//! interview bit - Group Anagrams
vector<vector<int> > Solution::anagrams(const vector<string> &A) {
    vector<vector<int>> ans;
    map<vector<int>,vector<int>> mp;
    
    for(int i=0;i<A.size();i++){
        string str = A[i];
        vector<int> bt(256,0);
        for(auto ch : str) bt[ch]++;
        mp[bt].push_back(i+1);
    }
    
    for(auto [arr,temp] : mp) {
        ans.push_back(temp);   
    }
    
    return ans;
}

vector<vector<int> > Solution::anagrams(const vector<string> &A) {
    vector<vector<int>> ans;
    map<string,vector<int>> mp;
    
    for(int i=0;i<A.size();i++){
        string str = A[i];
        sort(str.begin(),str.end());
        mp[str].push_back(i+1);
    }
    
    for(auto [arr,temp] : mp) {
        ans.push_back(temp);   
    }
    
    return ans;
}

//! leetcode - Group Anagrams
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> ans;
        map<vector<int>,vector<string>> mp;
        
        for(int i=0;i<strs.size();i++){
            string str = strs[i];
            vector<int> bt(256,0);
            for(auto ch : str) bt[ch]++;
            mp[bt].push_back(str);
        }
        
        for(auto [arr,temp] : mp) ans.push_back(temp);   
        return ans;
    }
};

//! Leetcode Anagrams
class Solution {
public:
    bool isAnagram(string s, string t) {
        vector<int> freq(256,0);
        for(auto ch : s) freq[ch]++;
        for(auto ch : t) freq[ch]--;

        for(auto i : freq) if(i) return false;
        return true;
    }
};

class Solution {
public:
    bool isAnagram(string s, string t) {
        map<char,int> m1, m2;
        for(auto ch : s) m1[ch]++;
        for(auto ch : t) m2[ch]++;

        for(auto [ch,cnt] : m1) if(cnt != m2[ch]) return false;
        for(auto [ch,cnt] : m2) if(cnt != m1[ch]) return false;

        return true;
    }
};