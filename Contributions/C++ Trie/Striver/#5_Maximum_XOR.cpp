/*
    TODO: Maximum XOR 
    ? https://www.codingninjas.com/codestudio/problems/maximum-xor_973113?leftPanelTab=0
*/

#include "bits/stdc++.h"
using namespace std;

class Node {
private:
    Node* links[2];
public:
    bool containKey(int no) { return (links[no] != nullptr); }
    void put(int no, Node* node) { links[no] = node; }
    Node* get(int no) { return links[no]; }
};

int maxXOR(int n, int m, vector<int> &arr1, vector<int> &arr2) {
    int sz = 32, mx = 0;
    Node* root = new Node();

    for(auto no : arr1) {
        Node* node = root;
        vector<int> st(sz,0);

        for(int i=0;i<sz;i++) 
            if(no & (1 << i)) st[i] = 1;

        for(int i=st.size()-1;i>=0;i--) {
            if(node->containKey(st[i]) == false) {
                node->put(st[i], new Node());
            }
            node = node->get(st[i]);
        }
    }


    for(auto x : arr2) {
        int ans = 0;
        Node* node = root;
        vector<int> bt(32,0);

        for(int i=0;i<sz;i++) 
            if(x & (1 << i)) bt[i] = 1;

        for(int i=bt.size()-1;i>=0;i--) {
            if(node->containKey(!bt[i])) {
                ans = ans | ((1 << i) * !bt[i]);
                // ans[i] = !bt[i];
                node = node->get(!bt[i]);
            } else ans = ans | ((1 << i) * bt[i]), node = node->get(bt[i]);
        }

        mx = max(mx,ans^x);
    }

    return mx;
}


// ! TLE using bitset
class Node {
private:
    Node* links[2];
public:
    bool containKey(char no) { return (links[no] != nullptr); }
    void put(char no, Node* node) { links[no] = node; }
    Node* get(char no) { return links[no]; }
};

int maxXOR(int n, int m, vector<int> &arr1, vector<int> &arr2) {
    long unsigned int mx = 0;
    Node* root = new Node();

    for(auto no : arr1) {
        Node* node = root;
        bitset<32> bt(no);
        // cout<<bt<<endl;
        for(int i=bt.size()-1;i>=0;i--) {
            // cout<<bt[i];
            if(node->containKey(bt[i]) == false) {
                node->put(bt[i], new Node());
            }

            node = node->get(bt[i]);
        }
        // cout<<endl;
    }


    for(auto x : arr2) {
        Node* node = root;
        bitset<32> bt(x),ans;
        for(int i=bt.size()-1;i>=0;i--) {
            if(node->containKey(!bt[i])) {
                ans[i] = !bt[i];
                node = node->get(!bt[i]);
            } else ans[i] = bt[i], node = node->get(bt[i]);
        }

        mx = max(mx,ans.to_ulong()^x);
    }

    return mx;
}