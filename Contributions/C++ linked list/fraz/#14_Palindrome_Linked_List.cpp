/*
    TODO: Palindrome Linked List
    ? https://leetcode.com/problems/palindrome-linked-list/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    bool isPalindrome(ListNode* head) {
        vector<int> res;
        while(head) res.push_back(head->val),head = head->next;
        int start = 0,end = res.size() - 1;
        while(start <= end) if(res[start++] != res[end--]) return false;
        return true;
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

