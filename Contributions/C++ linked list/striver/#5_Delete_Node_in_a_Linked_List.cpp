/*
    TODO: Delete Node in a Linked List
    ? https://leetcode.com/problems/delete-node-in-a-linked-list/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    void deleteNode(ListNode* node) {
        swap(node->val,node->next->val);
        node->next = node->next->next;
    }
};