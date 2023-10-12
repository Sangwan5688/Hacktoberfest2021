/*
    TODO: Reverse a linked list
    ? https://practice.geeksforgeeks.org/problems/reverse-a-linked-list/1
    ? https://leetcode.com/problems/reverse-linked-list/
*/

#include "bits/stdc++.h"
using namespace std;

struct node{
    int data;
    struct node *next;
};

class Solution{
    public:
        struct Node* dummy = NULL;
        void reverse(struct Node *head){
            if(head == NULL) return;
            struct Node* next = head->next;
            head->next = dummy;
            dummy = head;
            head = next;
            reverse(next);
        }
        struct Node* reverseList(struct Node *head){
            reverse(head);
            return dummy;
        }
};

struct Node* reverseList1(struct Node *head){
    struct Node* dummy = NULL;
    while(head){
        struct Node* next = head->next;
        head->next = dummy;
        dummy = head;
        head = next;
    }
    return dummy;
}