// solution to merge k sorted list leetcode 
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
struct compare {
    bool operator() (ListNode* temp1, ListNode* temp2) {
        return temp1->val > temp2->val;
    }
};

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, compare> pq;
        int n = lists.size();
        for(int i = 0; i < n; i++) {
            if(lists[i]) pq.push(lists[i]);
        }
        ListNode* head = new ListNode(-1);
        ListNode* temp = head;
        while(!pq.empty()) {
            auto p = pq.top(); pq.pop();
            temp->next = p;
            temp = temp->next;
            if(p->next) pq.push(p->next);
        }
        return head->next;
    }
};
