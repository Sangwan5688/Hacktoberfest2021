/*
    TODO: Linked List Cycle
    ? https://leetcode.com/problems/linked-list-cycle/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *h1 = head, *h2 = head;
        while(h1 and h2) {
            h1 = h1->next;
            h2 = h2->next;
            if(h2) h2 = h2->next;
            if(h1 != nullptr and h1 == h2) return true;
        }
        return false;
    }
};