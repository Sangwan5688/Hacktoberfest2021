/*
    TODO: Implement Trie (Prefix Tree)
    ? https://leetcode.com/problems/implement-trie-prefix-tree/
*/
 
#include "bits/stdc++.h"
using namespace std;

class Node {
public:
    Node* links[26];
    bool flag = false;
    bool containKeys(char ch) { return (links[ch - 'a'] != nullptr); }
    void put(char ch, Node* node) { links[ch - 'a'] = node; }
    Node* get(char ch) { return links[ch - 'a']; }
    void setEnd() { flag = true; }
    bool isEnd() { return flag; }
};

class Trie {
    Node* root = nullptr;
public:
    Trie() {
        root = new Node();
    }
    
    void insert(string word) {
        Node* node = root;
        for(auto ch : word) {
            if(!node->containKeys(ch)) {
                Node* temp = new Node();
                node->put(ch,temp);
            } 
            node = node->get(ch);
        }
        node->setEnd();
    }
    
    bool search(string word) {
        Node* node = root;
        for(auto ch : word) {
            if(node->containKeys(ch)) {
                node = node->get(ch);
            } else return false;
        }
        return node->isEnd();
    }
    
    bool startsWith(string prefix) {
        Node* node = root;
        for(auto ch : prefix) {
            if(node->containKeys(ch)) {
                node = node->get(ch);
            } else return false;
        }
        return true;
    }
};