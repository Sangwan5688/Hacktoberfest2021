/*
    TODO: Design Browser History
    ? https://leetcode.com/problems/design-browser-history/
*/

#include "bits/stdc++.h"
using namespace std;



class ListNode{
public:
    int val;
    ListNode* next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x,ListNode* next) : val(x), next(next) {}
    ~ListNode() {}
};

