/*
    TODO: Copy List with Random Pointer
    ? https://leetcode.com/problems/copy-list-with-random-pointer/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    map<Node*,Node*> mp, rmp;
    Node* copyRandomList(Node* head) {
        if(head == nullptr) return nullptr;

        Node* h = head;
        Node* root = new Node(h->val), *ans = root;
        mp[h] = root, rmp[root] = h;
        h = h->next;

        while(h) {
            Node* temp = new Node(h->val);
            mp[h] = temp, rmp[temp] = h;
            root->next = temp;
            root = root->next, h = h->next;
        }
        root = ans, h = head;
        
        while(h) {
            mp[h]->random = mp[h->random];
            h = h->next;
        }

        return ans;
    }
};
