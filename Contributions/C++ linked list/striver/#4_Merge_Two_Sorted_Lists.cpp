/*
    TODO: Merge Two Sorted Lists
    ? https://leetcode.com/problems/merge-two-sorted-lists/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if(l1 == nullptr and l2 == nullptr) return nullptr;
        else if(l1 == nullptr) return l2;
        else if(l2 == nullptr) return l1;

        if(l1->val <= l2->val){
            l1->next = mergeTwoLists(l1->next,l2);
            return l1;
        } else {
            l2->next = mergeTwoLists(l1,l2->next);
            return l2;
        }
    }
};