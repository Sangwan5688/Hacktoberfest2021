/*
    TODO: Complete String 
    ? https://www.codingninjas.com/codestudio/problems/complete-string_2687860
*/

#include <bits/stdc++.h> 
class Node {
public:
    Node* links[26];
    int cntEndWith = 0, cntPrefix = 0;
    bool containKey(char ch) { return (links[ch - 'a'] != nullptr); }
    void put(char ch, Node* node) { links[ch - 'a'] = node; }
    Node* get(char ch) { return links[ch - 'a']; }
    void increasePrefix() { cntPrefix++; }
    void delteEnd() { cntEndWith--; }
    void setEnd() { cntEndWith++; }
    int getEnd() { return cntEndWith; }
    int getPrefix() { return cntPrefix; }
    void reducePrefix() { cntPrefix--; }
};
string completeString(int n, vector<string> &a){
    Node* root = new Node();

    sort(a.begin(),a.end());

    map<int,vector<string>> mp;
    for(auto word : a) {
        Node* node = root;
        int cnt = 0, len = 0;
        for(auto ch : word) {
            if(node->containKey(ch) == false) {
                if(cnt != -1)
                    mp[cnt].push_back(word), cnt = -1;
                node->put(ch,new Node());
            } 
            node = node->get(ch);
            if(node->getEnd() and len == cnt) cnt++;
            len++;
            node->increasePrefix();
        }
        node->setEnd();
    }

    bool flag = false;
    for(auto no : mp.begin()->second) {
        flag = flag or (no.size() == 1);
    }
    if(flag == false) return "None";
    vector<string> temp;
    for(auto no : mp.rbegin()->second) {
        if(no.size() == mp.rbegin()->first+1){
            temp.push_back(no);
        }
    }
    sort(temp.begin(),temp.end());
    return temp[0];
}









































