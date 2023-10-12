/*
    TODO: LRU Cache
    ? https://leetcode.com/problems/lru-cache/
*/

#include "bits/stdc++.h"
using namespace std;

class LRUCache {
    unordered_map<int,list<int>::iterator> address;
    unordered_map<int,int> mp;
    list<int> dll;
    int capacity;
public:
    LRUCache(int capacity) { this->capacity = capacity; }
    int get(int key) {
        if(mp.find(key) != mp.end()) {
            int no = mp[key];
            list<int>::iterator itr = address[key];
            dll.erase(itr);
            address.erase(key);

            dll.push_front(key);
            address[key] = dll.begin();
            return no;
        } else return -1;
    }
    void put(int key, int value) {
        if(mp.find(key) != mp.end()) {
            list<int>::iterator itr = address[key];
            dll.erase(itr);
            mp.erase(key);
            address.erase(key);
        }
        if(dll.size() + 1 > capacity) {
            int no = dll.back();
            dll.pop_back();
            mp.erase(no);
            address.erase(no);
        }
        dll.push_front(key);
        mp[key] = value;
        address[key] = dll.begin();
    }
};