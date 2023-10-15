/*
    TODO: Design HashMap
    ? https://leetcode.com/problems/design-hashmap/
*/

#include "bits/stdc++.h"
using namespace std;

class MyHashMap {
    vector<list<pair<int,int>>> arr;
    int sz = 1e6 + 5;
public:
    MyHashMap() { arr.resize(sz); }
    int hash(int key){ return key%sz; }
    list<pair<int,int>>::iterator search(int key){
        int index = hash(key);
        // return find(arr[index].begin().arr[index].end(),key);
        // for(auto i : arr[index]){
        //     if(i.first == key) return i;
        // }
        // return arr[index].end();
        list<pair<int,int>> :: iterator it = arr[index].begin();
        while(it != arr[index].end()){
            if(it->first == key) return it;
            it++;
        }
        return it;
    }
    void put(int key, int value) {
        int index = hash(key);
        remove(key);
        arr[index].push_back({key,value});
    }
    int get(int key) {
        auto ptr = search(key);
        if(ptr == arr[hash(key)].end()) return -1;
        return ptr->second;
    }
    void remove(int key) {
        auto ptr = search(key);
        int index = hash(key);
        if(ptr != arr[index].end()){
            arr[index].erase(ptr);
        }
    }
};

class MyHashMap {
    vector<int> arr;
    int sz = 1e6 + 5;
public:
    MyHashMap() {
        arr.resize(sz);
        for(auto &i : arr) i = -1;
    }
    
    void put(int key, int value) {
        arr[key] = value;
    }
    
    int get(int key) {
        return arr[key];
    }
    
    void remove(int key) {
        arr[key] = -1;
    }
};