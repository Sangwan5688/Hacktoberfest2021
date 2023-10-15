/*
    TODO: Middle of the Linked List
    ? https://leetcode.com/problems/reverse-linked-list/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {  
public:
    ListNode* reverseList(ListNode* head) {
        if(head == nullptr) return head;

        ListNode* dummy = nullptr;
        while(head) {
            ListNode* next = head->next;
            head->next = dummy;
            dummy = head;

            head = next;
        }
        return dummy;
    }
};