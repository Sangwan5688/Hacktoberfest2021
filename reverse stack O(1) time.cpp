#include<bits/stdc++.h>
using namespace std;
 
class StackNode {
    public:
    int data;
    StackNode *next;
     
    StackNode(int data)
    {
        this->data = data;
        this->next = NULL;
    }
};
 
class Stack {
     
    StackNode *top;
     
    public:
     
    // Push and pop operations
    void push(int data)
    {
        if (top == NULL) {
            top = new StackNode(data);
            return;
        }
        StackNode *s = new StackNode(data);
        s->next = top;
        top = s;
    }
     
    StackNode* pop()
    {
        StackNode *s = top;
        top = top->next;
        return s;
    }
 
    // prints contents of stack
    void display()
    {
        StackNode *s = top;
        while (s != NULL) {
            cout << s->data << " ";
            s = s->next;
        }
        cout << endl;
    }
 
    // Reverses the stack using simple
    // linked list reversal logic.
    void reverse()
    {
        StackNode *prev, *cur, *succ;
        cur = prev = top;
        cur = cur->next;
        prev->next = NULL;
        while (cur != NULL) {
 
            succ = cur->next;
            cur->next = prev;
            prev = cur;
            cur = succ;
        }
        top = prev;
    }
};
 
// driver code
int main()
{
    Stack *s = new Stack();
    s->push(1);
    s->push(2);
    s->push(3);
    s->push(4);
    cout << "Original Stack" << endl;;
    s->display();
    cout << endl;
     
    // reverse
    s->reverse();
 
    cout << "Reversed Stack" << endl;
    s->display();
     
    return 0;
}
