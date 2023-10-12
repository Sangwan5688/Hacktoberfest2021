/*
    TODO: Palindrome Linked List
    ? https://leetcode.com/problems/palindrome-linked-list/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* reverse(ListNode* head) {
        ListNode* dummy = nullptr;
        while(head) {
            ListNode* next = head->next;
            head->next = dummy;
            dummy = head;
            head = next;
        }
        return dummy;
    }
    bool isPalindrome(ListNode* head) {
        ListNode *h1 = head, *h2 = head;
        while(h1->next and h2->next and h2->next->next) h1 = h1->next, h2 = h2->next->next;

        h1->next = reverse(h1->next);
        h1 = h1->next;
        h2 = head;
        while(h1) {
            if(h1->val != h2->val) return false;
            h1 = h1->next, h2 = h2->next;
        }
        return true;
    }
};

class Solution {
public:
    bool isPalindrome(ListNode* head) {
        string s = "";
        while(head) s.push_back(head->val + '0'), head = head->next;

        int low = 0, high = s.size()-1;
        while(low < high) if(s[low++] != s[high--]) return false;
        return true;
    }
};