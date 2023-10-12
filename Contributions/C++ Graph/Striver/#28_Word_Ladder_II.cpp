/*
    TODO: Word Ladder II
    ? https://leetcode.com/problems/word-ladder-ii/ 
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    vector<vector<string>> ans;
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string> & wordList) {
        set<string> st(wordList.begin(),wordList.end()), prev;
        queue<string> q;
        map<int,vector<string>> mp;
        int level = 1;

        q.push(beginWord);
        int flag = 0;
        while (!q.empty()) {
            int sz = q.size();
            for (int cnt = 0; cnt < sz; cnt++) {
                string word = q.front();
                q.pop();

                if (word == endWord and flag == 0) {
                    mp[level].push_back(word);
                    cout<<level<<" -- "<<word<<endl;
                    flag = 1;
                    break;
                }

                for (int i = 0; i < word.size(); i++) {
                    char org = word[i];
                    for (char ch = 'a'; ch <= 'z'; ch++) {
                        if (ch == org) continue;
                        word[i] = ch;
                        if (st.find(word) != st.end() and prev.find(word) == prev.end()) {
                            prev.insert(word);
                            q.push(word);
                            if(word == endWord) flag = 1;
                            mp[level].push_back(word);
                        }
                    }
                    word[i] = org;
                }
            }
            if(flag) break;
            level++;
        }

        for(auto [no,arr] : mp){
            cout<<no<<" :: ";
            for(auto i : arr){
                cout<<i<<" ";
            }
            cout<<endl;
        }

        bool f = false;
        if(mp.size() != 0){
            for(auto i : mp.rbegin()->second){
                if(i == endWord) {
                    f = true;
                }
            }
        }   

        if(f){
            vector<string> temp = {endWord};
            dfs(endWord,temp,mp,mp.rbegin()->first - 1);
            for(auto &arr : ans){
                arr.push_back(beginWord);
                reverse(arr.begin(),arr.end());
            }
        }
        return ans;
    }
    void dfs(string s, vector<string>& ds, map<int,vector<string>>& mp,int level) {
        for(auto i : mp[level]) {
            if(diff(s,i) == 1){
                ds.push_back(i);
                dfs(i,ds,mp,level-1);
                ds.pop_back();
            }
        }
        if(level == 0){
            ans.push_back(ds);
        }
    }
    int diff(string s1, string s2){
        int cnt = 0;
        for(int i=0;i<s1.size();i++){
            if(s1[i] != s2[i]) cnt++;
        }
        return cnt;
    }
};
/*

*/


//! fail b/c of tle 32/36 in Leetcode But passed in GFG 
class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        vector<vector<string>> ans;
        // queue<pair<string,vector<string>>> q;
        queue<vector<string>> q;
        unordered_set<string> st(wordList.begin(),wordList.end()),prev;
        q.push({beginWord});

        while(!q.empty()){
            int sz = q.size(), flag = 0;
            vector<string> kk;
            for(int cnt = 0; cnt<sz; cnt++){
                string word = q.front().back();
                // cout<<word<<endl;
                vector<string> temp = q.front();

                q.pop();
                if(word == endWord){
                    flag = 1;
                    ans.push_back(temp);
                    // for(auto i : temp) cout<<i<<" ";
                    // cout<<endl;
                }

                for(int i=0;i<word.size();i++){
                    char org = word[i];
                    for(char ch = 'a';ch <= 'z'; ch++){
                        if(ch == org) continue;
                        word[i] = ch;
                        if(st.find(word) != st.end() and prev.find(word) == prev.end()){
                            kk.push_back(word);
                            temp.push_back(word);
                            q.push(temp);
                            temp.pop_back();
                        }
                    }
                    word[i] = org;
                }
            }
            if(flag) break;
            for(auto i : kk) prev.insert(i);
        }
        return ans;
    }
};