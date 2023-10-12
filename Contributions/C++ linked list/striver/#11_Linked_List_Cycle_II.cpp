/*
    TODO: Linked List Cycle II
    ? https://leetcode.com/problems/linked-list-cycle-ii/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode* h1 = head, *h2 = head;
        while(h1 and h2) {
            h1 = h1->next, h2 = h2->next;
            if(h2) h2 = h2->next;
            if(h1 == h2) break;
        }
        h1 = head;
        while(h1 and h2) {
            if(h1 == h2) return h1;
            h1 = h1->next, h2 = h2->next;
        }
        return nullptr;
    }
};