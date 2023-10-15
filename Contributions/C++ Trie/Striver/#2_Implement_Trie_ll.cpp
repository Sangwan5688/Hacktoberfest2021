/*
    TODO: Implement Trie ll 
    ? https://www.codingninjas.com/codestudio/problems/implement-trie_1387095
*/
 
#include <bits/stdc++.h> 
class Node {
private:
    Node* links[26];
    int cntEndWith = 0;
    int cntPrefix = 0;
public:
    bool containKey(char ch) {
        return (links[ch - 'a'] != nullptr);
    }
    Node* get(char ch) {
        return links[ch - 'a'];
    }
    void put(char ch, Node* node) {
        links[ch - 'a'] = node;
    }
    void increaseEnd() {
        cntEndWith++;
    }
    void increasePrefix() {
        cntPrefix++;
    }
    void deleteEnd() {
        cntEndWith--;
    }
    void reducePrefix() {
        cntPrefix--;
    }
    int getEnd() {
        return cntEndWith;
    }
    int getPrefix() {
        return cntPrefix;
    }
};

class Trie{
private:
    Node* root = nullptr;
public:

    Trie(){ root = new Node(); }

    void insert(string &word){
        Node* node = root;
        for(auto ch : word) {
            if(node->containKey(ch) == false) {
                Node* temp = new Node();
                node->put(ch, temp);
            }
            node = node->get(ch);
            node->increasePrefix();
        }
        node->increaseEnd();
    }

    int countWordsEqualTo(string &word){
        Node* node = root;
        for(auto ch : word) {
            if(node->containKey(ch)) {
                node = node->get(ch);
            } else return 0;
        }
        return node->getEnd();
    }

    int countWordsStartingWith(string &word){
        Node* node = root;
        for(auto ch : word) {
            if(node->containKey(ch)) {
                node = node->get(ch);
            } else return 0;
        }
        return node->getPrefix();
    }

    void erase(string &word){
        Node* node = root;
        for(auto ch : word) {
            if(node->containKey(ch)) {
                node = node->get(ch);
                node->reducePrefix();
            } else return;
        }
        node->deleteEnd();
    }
};
