/*
    TODO: Flattening a Linked List
    ? https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1
*/

#include "bits/stdc++.h"
using namespace std;

Node* merge(Node *h1, Node *h2) {
    if(h1 == nullptr) return h2;
    else if(h2 == nullptr) return h1;
    
    if(h1->data <= h2->data) {
        h1->bottom = merge(h1->bottom,h2);
        return h1;
    } else {
        h2->bottom = merge(h1,h2->bottom);
        return h2;
    }
}

Node* flatten(Node *root) {
    if(root->next == nullptr) return root;
    Node *ans = merge(root,flatten(root->next));
    return ans;
}