/*
    TODO: Merge Two Sorted Lists
    ? https://leetcode.com/problems/merge-two-sorted-lists/
*/

#include "bits/stdc++.h"
using namespace std;

class ListNode{
    public:
        int val;
        ListNode* next;
        ListNode() : val(0), next(nullptr) {}
        ListNode(int x) : val(x), next(nullptr) {}
        ListNode(int x,ListNode* next) : val(x), next(next) {}
        ~ListNode() {}
};

class Solution {
public:
    ListNode* merge(ListNode* l1,ListNode* l2){
        if(l1 == nullptr) return l2;
        if(l2 == nullptr) return l1;
        if(l1->val <= l2->val){
            l1->next = merge(l1->next,l2);
            return l1;
        }else{
            l2->next = merge(l1,l2->next);
            return l2;
        }
    }
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        return merge(l1,l2);
    }
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode *head = nullptr, *ans = nullptr;
        if(l1 == nullptr) return l2;
        if(l2 == nullptr) return l1;
        if(l1->val <= l2->val){
            ans = l1;
            l1 = l1->next;
        }else{
            ans = l2;
            l2 = l2->next;
        }
        head = ans;
        while(l1 and l2){
            if(l1->val <= l2->val){
                ans->next = l1;
                ans = ans->next;
                l1 = l1->next;
            }else{
                ans->next = l2;
                ans = ans->next;
                l2 = l2->next;
            }
        }
        if(l1 == nullptr) ans->next = l2;
        if(l2 == nullptr) ans->next = l1;
        return head;
    }
};