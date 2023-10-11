#include <bits/stdc++.h>

using namespace std;

class SinglyLinkedListNode {
    public:
        int data;
        SinglyLinkedListNode *next;

        SinglyLinkedListNode(int node_data) {
            this->data = node_data;
            this->next = nullptr;
        }
};

class SinglyLinkedList {
    public:
        SinglyLinkedListNode *head;
        SinglyLinkedListNode *tail;
        
        SinglyLinkedList() {
            this->head = nullptr;
            this->tail = nullptr;
        
        }
        void insert_node_at_end(int node_data) {
            SinglyLinkedListNode* new_node = new SinglyLinkedListNode(node_data);
            
            if (!this->head)
                this->head = new_node;
            else
                this->tail->next = new_node;
            
            this->tail = new_node;
        }
        void insert_node_at_front(int node_data){
            SinglyLinkedListNode* new_node = new SinglyLinkedListNode(node_data);
            new_node->next = this->head;
            this->head = new_node;
        
        }
        void insert_node_at_index(int node_data, int position){
            SinglyLinkedListNode* new_node = new SinglyLinkedListNode(node_data);
            SinglyLinkedListNode* temp = this->head;
            for (int i=0;i<position;i++) {
                
                if (i==position-1) {
                    new_node->next = temp->next;
                    temp->next = new_node;
                    return;
                }
                temp = temp->next;
            }
            new_node->next = this->head;
            this->head = new_node;
        }
        int len(){
            SinglyLinkedListNode* temp = this->head;
            int size=0;
            while(temp->next != NULL){
                size++;
            }
            return size;
        }
        void delete_node(int position){
            SinglyLinkedListNode* temp = this->head;
            SinglyLinkedListNode* prev = NULL;
            if (temp->next == NULL)
                return;
            if(position==0){
                this->head = temp->next;
                free(temp);
                return;
            }
            for(int i=0;temp!= NULL && i<position-1;i++){
                temp = temp->next;
            }
            // if position is greater than the size of list
            if (temp == NULL || temp->next == NULL)
                return;
            prev = temp->next->next;
            free(temp->next);
            temp->next = prev;
        }
        void reverse_ll(){
            SinglyLinkedListNode* current = this->head;
            SinglyLinkedListNode* prev = NULL;
            SinglyLinkedListNode* next = NULL;
            while (current != NULL) {
            // Store next
            next = current->next;
 
            // Reverse current node's pointer
            current->next = prev;
 
            // Move pointers one position ahead.
            prev = current;
            current = next;
        }
        swap(this->head,this->tail);
        }

};

void print_singly_linked_list(SinglyLinkedListNode* node, string sepration) {
    while (node) {
        cout << node->data;
        node = node->next;
        if (node)
            cout << sepration;
    }
}


int main()
{
    int num;
    cin>>num;
    for (int i = 0; i < num; i++) {
        SinglyLinkedList* llist = new SinglyLinkedList();
        int len;
        cin>>len;
        for (int j = 0; j < len; j++) {
            int val;
            cin>>val;
            llist->insert_node_at_end(val);
        }
        llist->reverse_ll();
        print_singly_linked_list(llist->head, " ");
        cout<<endl;
        free(llist);
    }
return 0;
}
// this code is for reversing multiple linked list 
/*----------------------------------------------------------------
input:
2
3
1 2 3
2
2 1
output:
3 2 1
2 1
*/
