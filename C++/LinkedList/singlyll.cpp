#include<iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    // Constructor
    Node(int data) {
        this->data = data;
        this->next = NULL;
    }

    // Destructor
    ~Node() {
        int value = this->data;
        if (this->next != NULL) {
            delete next;
            this->next = NULL;
        }
        cout << "Memory is freed for node with data: " << value << endl;
    }
};

void InsertAtHead(Node*& head, int d) {
    Node* temp = new Node(d);
    temp->next = head;
    head = temp;
}

void InsertAtTail(Node*& tail, int d) {
    Node* temp = new Node(d);
    tail->next = temp;
    tail = temp;
}

void InsertAtPosition(Node*& head, Node*& tail, int position, int d) {
    if (position == 1) {
        InsertAtHead(head, d);
        return;
    }
    Node* temp = head;
    int cnt = 1;
    while (cnt < position - 1) {
        temp = temp->next;
        cnt++;
    }
    if (temp->next == NULL) {
        InsertAtTail(tail, d);
        return;
    }
    Node* nodeToInsert = new Node(d);
    nodeToInsert->next = temp->next;
    temp->next = nodeToInsert;
}

void deleteNode(int position, Node*& head, Node*& tail) {
    if (position == 1) {
        Node* temp = head;
        head = head->next;
        temp->next = NULL;
        delete temp;
        if (head == NULL) {
            // If the list becomes empty after deletion, update tail to NULL
            tail = NULL;
        }
    } else {
        Node* curr = head;
        Node* prev = NULL;
        int cnt = 1;
        while (cnt < position) {
            prev = curr;
            curr = curr->next;
            cnt++;
        }
        prev->next = curr->next;
        curr->next = NULL;
        delete curr;
        if (prev->next == NULL) {
            // If the last node is deleted, update tail to the previous node
            tail = prev;
        }
    }
}


void print(Node*& head) {
    Node* temp = head;
    while (temp != NULL) {
        cout << temp->data << " ";
        if(temp->next!=NULL)cout<<"->";
        temp = temp->next;
    }
    cout << endl;
}

int main() {
    Node* node1 = new Node(10);
    Node* head = node1;
    Node* tail = node1;
    print(head);

    InsertAtTail(tail, 12);
    print(head);

    InsertAtTail(tail, 15);
    print(head);

    InsertAtPosition(head, tail, 4, 22);
    print(head);

    InsertAtPosition(head, tail, 1, 2);
    print(head);

    cout << "head: " << head->data << endl;
    cout << "tail: " << tail->data << endl;

    deleteNode(5, head,tail);
    print(head);

    cout << "head: " << head->data << endl;
    cout << "tail: " << tail->data << endl;

    return 0;
}
