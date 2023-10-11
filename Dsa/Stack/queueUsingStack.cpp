#include <iostream>
#include <stack>
#include <cstdlib>
using namespace std;
 
// Implement a queue using two stacks
class Queue
{
    stack<int> s1, s2;
 
public:
    // Add an item to the queue
    void enqueue(int data)
    {
        // Move all elements from the first stack to the second stack
        while (!s1.empty())
        {
            s2.push(s1.top());
            s1.pop();
        }
 
        // push item into the first stack
        s1.push(data);
 
        // Move all elements back to the first stack from the second stack
        while (!s2.empty())
        {
            s1.push(s2.top());
            s2.pop();
        }
    }
 
    // Remove an item from the queue
    int dequeue()
    {
        // if the first stack is empty
        if (s1.empty())
        {
            cout << "Underflow!!";
            exit(0);
        }
 
        // return the top item from the first stack
        int top = s1.top();
        s1.pop();
        return top;
    }
};
 
int main()
{
    int keys[] = { 1, 2, 3, 4, 5 };
    Queue q;
 
    // insert above keys
    for (int key: keys) {
        q.enqueue(key);
    }
 
    cout << q.dequeue() << endl;    // print 1
    cout << q.dequeue() << endl;    // print 2
 
    return 0;
}
