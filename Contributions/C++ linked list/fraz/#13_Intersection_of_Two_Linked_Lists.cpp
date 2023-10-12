/*
    TODO: Intersection of Two Linked Lists
    ? https://leetcode.com/problems/intersection-of-two-linked-lists/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *h1, ListNode *h2) {
        int cnt1 = 0,cnt2 = 0;
        ListNode *t1 = h1, *t2 = h2;
        while(h1 and h2){
            if(h1 == h2) return h1;
            h1 = h1->next;
            h2 = h2->next;
            if(h1 == nullptr and cnt1 == 0) h1 = t2,cnt1++;
            if(h2 == nullptr and cnt2 == 0) h2 = t1,cnt2++;
        }
        return nullptr;
    }
};

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *h1, ListNode *h2) {
        int len1 = 0,len2 = 0;
        ListNode *t1 = h1,*t2 = h2;
        while(t1) len1++,t1 = t1->next;
        while(t2) len2++,t2 = t2->next;
        if(len1 <= len2){
            int diff = len2 - len1;
            while(diff--) h2 = h2->next;
        }else{
            int diff = len1 - len2;
            while(diff--) h1 = h1->next;
        }
        while(h1 and h2){
            if(h1 == h2) return h1;
            h1 = h1->next;
            h2 = h2->next;
        }
        return nullptr;
    }
};

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        set<ListNode*> st;
        int len = 0;
        while(headA) st.insert(headA), headA=headA->next,len++;
        while(headB){
            st.insert(headB);
            if(st.size() == len) return headB;
            headB=headB->next;
            len++;
        } 
        return nullptr;
    }
};

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        while(headA){
            ListNode* node = headB;
            while(node){
                if(headA == node) return node;
                node = node->next;
            }
            headA = headA->next;
        }
        return nullptr;
    }
};

class ListNode{
public:
    int val;
    ListNode* next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x,ListNode* next) : val(x), next(next) {}
    ~ListNode() {}
};

