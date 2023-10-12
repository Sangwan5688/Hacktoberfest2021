/*
    TODO: Middle of the Linked List
    ? https://leetcode.com/problems/middle-of-the-linked-list/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode *Ifriend = head, *IIfriend = head;
        while(IIfriend){
            if(IIfriend->next == nullptr) break;
            Ifriend = Ifriend->next;
            IIfriend = IIfriend->next;
            if(IIfriend) IIfriend = IIfriend->next;
            // cout<<(Ifriend->val)<<" "<<(IIfriend->val)<<endl;
        }
        return Ifriend;
    }
};

class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        int cnt = 0;
        ListNode* root = head;
        while(root) cnt++,root = root->next;
        cnt = cnt/2;
        root = head;
        while(head){
            cnt--;
            head = head->next;
            if(cnt == 0){
                root = head;
                break;
            }
        }
        return root;
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