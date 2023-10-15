/*
    TODO: Linked List Cycle II
    ? https://leetcode.com/problems/linked-list-cycle-ii/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *f = head,*s = head;
        while(s){
            f = f->next;
            s = s->next;
            if(s != nullptr) s = s->next;
            else return nullptr;
            if(f == s) break;
        }
        // cout<<f->val<<endl;
        while(head){
            if(f == head) return f;
            head = head->next;
            if(f) f = f->next;
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

