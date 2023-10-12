/*
    TODO: Remove Linked List Elements
    ? https://leetcode.com/problems/remove-linked-list-elements/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        ListNode* node = head;
        while(node){
            if(node->next != nullptr and node->next->val == val){
                ListNode* nextNode = node->next->next;
                ListNode* tar = node->next;
                node->next = nextNode;
                delete tar;
            }
            else if(node->next == nullptr and node->val == val){
                delete node;
                return nullptr;
            }
            else if(node->val == val){
                ListNode* tar = node;
                node = node->next;
                head = head->next;
                delete tar;
            }
            else node = node->next;
        }
        return head;
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

