/*
    TODO: Intersection of Two Linked Lists
    ? https://leetcode.com/problems/intersection-of-two-linked-lists/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        int l1 =0, l2 = 0, diff = 0;
        ListNode *h1 = headA, *h2 = headB;
        while(h1) l1++, h1 = h1->next;
        while(h2) l2++, h2 = h2->next;

        diff = abs(l1 - l2);
        h1 = headA, h2 = headB;
        if(l1 <= l2) while(diff--) h2 = h2->next;
        else while(diff--) h1 = h1->next;

        // cout<<h1->val<<" "<<h2->val<<endl;

        while(h1 and h2) {
            if(h1 == h2) return h1;
            h1 = h1->next, h2 = h2->next;
        }
        return nullptr;
    }
};