/*
    TODO: Linked List Cycle
    ? https://leetcode.com/problems/linked-list-cycle/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool hasCycle(ListNode *head) {
        map<ListNode*,int> mp;
        while(head){
            mp[head]++;
            if(mp[head] > 1) return true;
            head = head->next;
        }
        return false;
    }
};

class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode* tar = nullptr,*f = head,*s = head;
        while(s){
            f = f->next;
            s = s->next;
            if(s != nullptr) s = s->next;
            else break;
            if(f == s) return true;
        }
        return false;
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

