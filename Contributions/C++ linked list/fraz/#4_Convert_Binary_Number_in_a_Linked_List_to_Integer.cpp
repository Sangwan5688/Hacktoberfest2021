/*
    TODO: Convert Binary Number in a Linked List to Integer
    ? https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int getDecimalValue(ListNode* head) {
        int ans = 0;
        while(head){
            ans = ans*2 + head->val;
            head = head->next;
        }
        return ans;
    }
};

class Solution {
public:
    int getDecimalValue(ListNode* head) {
        ListNode* root = head;
        int len = 0;
        while(root != NULL) len++,root = root->next;
        int ans = 0;
        len--;
        while(head != NULL){
            if(head->val)
                ans = ans + pow(2,len);
            len--;
            head = head->next;
        }
        return ans;
    }
};

class ListNode{
private:
public:
    int val;
    ListNode* next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x,ListNode* next) : val(x), next(next) {}
    ~ListNode() {}
};