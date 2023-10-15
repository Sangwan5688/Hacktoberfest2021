/*
    TODO: Word Ladder I
    ? https://leetcode.com/problems/word-ladder/
*/

#include "bits/stdc++.h"
using namespace std;

//! striver
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        queue<pair<string,int>> q;
        q.push({beginWord,1});
        set<string> st(wordList.begin(),wordList.end());
        st.erase(beginWord);
        while(!q.empty()){
            string word = q.front().first;
            int steps = q.front().second;
            if(word == endWord) return steps;
            q.pop();

            for(int i=0;i<word.size();i++){
                char orginal = word[i];
                for(char ch='a';ch<='z';ch++){
                    word[i] = ch;
                    if(st.find(word) != st.end()){
                        st.erase(word);
                        q.push({word,steps+1});
                    }
                }
                word[i] = orginal;
            }
        }
        return 0;
    }
};

//! key was bfs traversal
class Solution {
public:
    unordered_set<string> st,prev;
    // set<string> st,prev;
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        for(auto i : wordList) st.insert(i);
        int level = 0, flag = 0;
        queue<string> q;
        q.push(beginWord);
        while(!q.empty()){
            int sz = q.size();
            for(int cnt=0;cnt<sz;cnt++){
                string s1 = q.front();
                q.pop();
                if(s1 == endWord){
                    flag = 1;
                    break;
                }
                for(int i=0;i<s1.size();i++){
                    char orginal = s1[i];
                    for(char ch='a';ch<='z';ch++){
                        if(orginal == ch) continue;
                        s1[i] = ch;
                        if(st.find(s1) != st.end() and prev.find(s1) == prev.end()){
                            prev.insert(s1);
                            q.push(s1);
                        }
                    }
                    s1[i] = orginal;
                }
            }
            if(flag == 1) break;
            level++;
        }
        if(flag == 0) return flag;
        return level+1;
    }
};

//! fail 1 (leetcode) b/c of dfs approach instead use bfs
class Solution {
public:
    set<string> st;
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        for(auto i : wordList) st.insert(i);
        return pre(0,beginWord,endWord);
    }
    int pre(int index,string s1, string s2){
        if(s1 == s2) return 0;
        cout<<s1<<" "<<s2<<endl;
        int n = s1.size(), cnt = 1e9;
        for(int i=index;i<n;i++){
            if(s1[i] != s2[i]){
                for(char k='a';k<='z';k++){
                    char org = s1[i];
                    s1[i] = k;
                    cout<<s1<<endl;
                    if(st.find(s1) != st.end()){
                        // cout<<s1<<" "<<s2<<endl;
                        int temp = pre(index+1,s1,s2);
                        if(temp != -1){
                            // cout<<s1<<" "<<s2<<endl;
                            return 1 + temp;
                            // cnt = min(cnt, 1 + temp);   
                        }
                    }
                    s1[i] = org;
                }
            }
        }
        if(index == n-1) pre(0,s1,s2);
        return -1;
    }
};
