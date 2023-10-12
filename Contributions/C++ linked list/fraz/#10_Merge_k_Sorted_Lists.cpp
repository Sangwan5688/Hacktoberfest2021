/*
    TODO: Merge k Sorted Lists
    ? https://leetcode.com/problems/merge-k-sorted-lists/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<int,vector<int>,greater<int>> pq;
        for(auto list : lists){
            ListNode* node = list;
            while(list) pq.push(list->val), list = list->next;
        }
        if(!pq.size()) return nullptr;
        ListNode *ans = new ListNode(pq.top()),*head = nullptr;
        head = ans;
        pq.pop();
        while(!pq.empty()){
            ListNode* temp = new ListNode(pq.top());
            pq.pop();
            ans->next = temp;
            ans = ans->next;
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

