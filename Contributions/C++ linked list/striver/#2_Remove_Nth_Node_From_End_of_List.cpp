/*
    TODO: Remove Nth Node From End of List
    ? https://leetcode.com/problems/remove-nth-node-from-end-of-list/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode *h = head;
        int len = 0;
        while(h) h = h->next, len++;
        n = len - n - 1;

        if(len == 1 and n == -1) return nullptr;
        else if(n == -1) return head->next;
        

        h = head;
        while(n-- and h) h = h->next;

        if(h->next->next) h->next = h->next->next;
        else h->next = nullptr;

        return head;
    }
};