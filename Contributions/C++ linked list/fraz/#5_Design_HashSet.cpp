/*
    TODO: Design HashSet
    ? https://leetcode.com/problems/design-hashset/description/
*/

#include "bits/stdc++.h"
using namespace std;

class MyHashSet {
    vector<list<int>> v;
    int sz = 0;
public:
    MyHashSet() {
        sz = 1000;
        v.resize(sz);
    }
    int hash(int key){
        return key%sz;
    }
    list<int>::iterator search(int key){
        int index = hash(key);
        return find(v[index].begin(),v[index].end(),key);
    }
    void add(int key) {
        if(contains(key)) return;
        int index = hash(key);
        v[index].push_back(key);
    }
    void remove(int key) {
        if(contains(key)){
            auto ptr = search(key);
            int index = hash(key);
            v[index].erase(ptr);
        }
    }
    bool contains(int key) {
        int index = hash(key);
        return (search(key) != v[index].end());
    }
};

class MyHashSet {
    vector<int> arr;
public:
    MyHashSet() : arr(1e6+5,0) { }
    void add(int key) { arr[key] = true; }
    void remove(int key) { arr[key] = false; }
    bool contains(int key) { return arr[key]; }
};