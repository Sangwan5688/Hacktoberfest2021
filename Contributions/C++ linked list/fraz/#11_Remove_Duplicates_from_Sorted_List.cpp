/*
    TODO: Remove Duplicates from Sorted List
    ? https://leetcode.com/problems/remove-duplicates-from-sorted-list/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* merge(ListNode* head){
        if(head == nullptr or head->next == nullptr) return head;
        if(head->val == head->next->val){
            return merge(head->next);
        }else{
            head->next = merge(head->next);
            return head;
            // ! error return head->next;
        }
    }
    ListNode* deleteDuplicates(ListNode* head) {
        return merge(head);
    }
};

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* node = head;
        while(node){
            if(node->next != nullptr and node->val == node->next->val){
                ListNode* tar = node->next;
                node->next = node->next->next;
                delete tar;
            }else node = node->next;
        }
        return head;
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

