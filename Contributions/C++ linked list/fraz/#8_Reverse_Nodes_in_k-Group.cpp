/*
    TODO: Reverse Nodes in k-Group
    ! Reverse Nodes in k-Group
    ? https://leetcode.com/problems/reverse-nodes-in-k-group/
*/

class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        if(head == nullptr or k == 1) return head;
        ListNode* dummy = new ListNode(0);
        dummy->next = head;

        ListNode *curr = dummy, *next = dummy, *pre = dummy;
        int count = 0;

        while(curr->next) {
            curr = curr->next;
            count++;
        }

        while(count >= k) {
            curr = pre->next;
            next = curr->next;
            for(int i=1; i< k;i++) {
                curr->next = next->next;
                next->next = pre->next;
                pre->next = next;
                next = curr->next;
            }
            pre = curr;
            count -= k;
        }
        return dummy->next;
    }
};