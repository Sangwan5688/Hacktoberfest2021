/*
    TODO: Delete Node in a Linked List
    ? https://leetcode.com/problems/delete-node-in-a-linked-list/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    void deleteNode(ListNode* node) {
        // swaping
        swap(node->val,node->next->val);
        ListNode* target = node->next;
        node->next = node->next->next;
        delete target;
    }
};

class ListNode{
private:
public:
    int val;
    ListNode* next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x,ListNode* next) : val(x), next(next) {}
    ~ListNode() {}
};