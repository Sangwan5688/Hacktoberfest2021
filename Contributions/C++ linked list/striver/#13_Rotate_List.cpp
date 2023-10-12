/*
    TODO: Rotate List
    ? https://leetcode.com/problems/rotate-list/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if(head == nullptr) return nullptr;

        int len = 0;
        ListNode* h = head;
        while(h) len++, h = h->next;
        k = k % len;
        while(k--) {
            int prev = head->val, curr = 0;
            ListNode *fast = head->next;
            while(fast) {
                curr = fast->val;
                fast->val = prev;
                prev = curr;
                fast = fast->next;
            }
            head->val = curr;
        }
        return head;
    }
};