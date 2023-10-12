/*
    TODO: Add Two Numbers
    ? https://leetcode.com/problems/add-two-numbers/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        string n1 = "", n2 = "";
        ListNode *h1 = l1, *h2 = l2;
        while(h1) {
            n1.push_back(h1->val + '0');
            h1 = h1->next;
        }
        while(h2) {
            n2.push_back(h2->val + '0');
            h2 = h2->next;
        }
        // 243 564

        int carry = 0, i = 0;
        if(n1.size() != 0) carry += (n1[i] - '0');
        if(n2.size() != 0) carry += (n2[i] - '0');
        ListNode* ans = new ListNode(carry%10), *head = ans;
        carry /= 10;
        i++;

        while(i < n1.size() and i < n2.size()) {
            carry += (n1[i] - '0');
            carry += (n2[i] - '0');
            ListNode* temp = new ListNode(carry%10);
            ans->next = temp;
            ans = ans->next;
            carry /= 10;
            i++;
        }

        while(i < n1.size()) {
            carry += (n1[i] - '0');
            ListNode* temp = new ListNode(carry%10);
            ans->next = temp;
            ans = ans->next;
            carry /= 10;
            i++;
        }

        while(i < n2.size()) {
            carry += (n2[i] - '0');
            ListNode* temp = new ListNode(carry%10);
            ans->next = temp;
            ans = ans->next;
            carry /= 10;
            i++;
        }

        while(carry) {
            ListNode* temp = new ListNode(carry%10);
            ans->next = temp;
            ans = ans->next;
            carry /= 10;
        }

        return head;
    }
};