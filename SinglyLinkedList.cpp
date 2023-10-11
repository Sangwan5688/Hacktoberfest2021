#include <iostream>
using namespace std;

struct Node
{
    int data;
    Node* next;
};

Node* createNode(int data)
{
    Node *node= new Node();
    node->data=data;
    node->next=NULL;
    return node;
}

Node* insert(Node *head, int data)
{
    if(head==NULL)
    head=createNode(data);
    else
    {
        Node *curr=head;
        while(curr->next!=NULL)
        {
            curr=curr->next;
        }
        curr->next=createNode(data);
    }
    
    return head;
}
void TraversingLinkedList(Node *head)
{
    if(head==NULL)
    cout<<"Linked List is empty\n";
    else
    {
        cout<<"The linked list is: \n";
        Node *curr=head;
        while(curr!=NULL)
        {
            cout<<curr->data<<" ";
            curr=curr->next;
        }
    }
}

int main()
{
   Node *head=NULL;
   head=insert(head,9);
   insert(head,5);
   insert(head,68);
   insert(head,80);
   insert(head,1);
   TraversingLinkedList(head);
   return 0;
}



