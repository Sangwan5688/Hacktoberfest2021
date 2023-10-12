/*
    TODO: Reverse Nodes in k-Group
    ? https://leetcode.com/problems/reverse-nodes-in-k-group/
*/

#include "bits/stdc++.h"
using namespace std;

//! 💘 Babar solution
class Solution {
public:
    bool check(ListNode* head, int k) {
        int len = 0;
        while(head) {
            len++;
            head = head->next;
            if(len >= k) return true;
        }
        return false;
    }
    ListNode* reverseKGroup(ListNode* head, int k) {
        if(head == nullptr) return nullptr;
        else if(!check(head,k)) return head;

        ListNode* ans = head, *dummy = nullptr, *nex = nullptr;
        int kk = k;
        while(head and k--) {
            ListNode* next = head->next;
            head->next = dummy; 
            dummy = head;
            head = next;
            nex = next;
        }

        ans->next = reverseKGroup(nex,kk);

        return dummy;
    }
};


//! Striver Ka RATA HUA Sollution
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        if(head == nullptr or k == 1) return head;
        ListNode* dummy = new ListNode(0);
        dummy->next = head;

        ListNode *curr = dummy, *next = dummy, *pre = dummy;
        int count = 0;

        while(curr->next) {
            curr = curr->next;
            count++;
        }

        while(count >= k) {
            curr = pre->next;
            next = curr->next;
            for(int i=1; i< k;i++) {
                curr->next = next->next;
                next->next = pre->next;
                pre->next = next;
                next = curr->next;
            }
            pre = curr;
            count -= k;
        }
        return dummy->next;
    }
};