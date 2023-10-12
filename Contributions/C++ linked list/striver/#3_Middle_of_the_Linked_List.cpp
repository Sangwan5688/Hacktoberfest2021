/*
    TODO: Middle of the Linked List
    ? https://leetcode.com/problems/middle-of-the-linked-list/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* h1 = head, *h2 = head->next;

        while(h2) {
            h2 = h2->next;
            h1 = h1->next;

            if(h2) h2 = h2->next;
        }
        return h1;
    }
};

class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* tail = head;
        ListNode* next = head;
        while (next != nullptr && next->next != nullptr) {
            cout << next->val << endl;
            tail = tail->next;
            next = next->next->next;
            cout << tail->val << endl;
        }
        return tail;
    }
};