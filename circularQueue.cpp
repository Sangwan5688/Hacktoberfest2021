#include <iostream>
#include <stdio.h>
#include <cmath>

using namespace std;

// definition of queue
class Queue
{
public:
    int size;
    int Rear;
    int Front;
    int *arr;
};

// Function to insert into queue
void Enqueue(Queue *p, int item)
{
    if ((p->Rear - p->Front == -1) || (p->Front == 0 && p->Rear == p->size - 1))
    {
        cout << "\nCircular Queue is full. More elements cannot be added!!\n";
        return;
    }
    else
    {
        if (p->Front == -1 && p->Rear == -1)
        {
            p->Front = 0;
            p->Rear = 0;
            p->arr[p->Rear] = item;
        }
        else if (p->Rear == p->size - 1 && p->Front > 0)
        {
            p->Rear = 0;
            p->arr[p->Rear] = item;
        }
        else
        {
            p->Rear++;
            p->arr[p->Rear] = item;
        }
    }
    cout << "Front: " << p->Front << " Rear: " << p->Rear << endl;
}

// function to delete from queue.
int pop(Queue *p)
{
    int item;
    if (p->Front == -1)
    {
        cout << "Circular Queue is empty!!\n";
        return -1;
    }
    else
    {
        if (p->Front == p->Rear)
        {
            item = p->arr[p->Front];
            p->Front = -1;
            p->Rear = -1;
            return item;
        }
        else if (p->Front == p->size - 1)
        {
            item = p->Front;
            p->Front = 0;
            return item;
        }
        else
        {
            item = p->arr[p->Front];
            p->Front++;
            return item;
        }
    }
}

// function to display the values of queue.
void Display(Queue *p)
{
    Queue tempQ;
    tempQ.Front = -1;
    tempQ.Rear = -1;
    tempQ.size = p->size;
    tempQ.arr = (int *)malloc(tempQ.size * sizeof(int));
    if (p->Rear >= p->Front)
    {
        for (int i = p->Front; i <= p->Rear; i++)
        {
            int popped = pop(p);
            cout << popped << endl;
            Enqueue(&tempQ, popped);
        }
        for (int i = tempQ.Front; i <= tempQ.Rear; i++)
        {
            int popped = pop(&tempQ);
            Enqueue(p, popped);
            // cout << tempQ.Front << " " << tempQ.Rear << endl;
        }
        // cout << tempQ.Front << " " << tempQ.Rear << endl;
    }
    else
    {
        for (int i = p->Front; i < p->size; i++)
        {
            int popped = pop(p);
            cout << popped << endl;
            Enqueue(&tempQ, popped);
        }
        for (int j = 0; j <= p->Rear; j++)
        {
            int popped = pop(p);
            cout << popped << endl;
            Enqueue(&tempQ, popped);
        }

        for (int i = tempQ.Front; i < tempQ.size; i++)
        {
            int popped = pop(&tempQ);
            Enqueue(p, popped);
        }
        for (int j = 0; j <= tempQ.Rear; j++)
        {
            int popped = pop(&tempQ);
            Enqueue(p, popped);
        }
    }
}

// function to perform search operation in the queue.
void Search(Queue *p, int index)
{
    Queue tempQ;
    tempQ.Front = -1;
    tempQ.Rear = -1;
    tempQ.size = p->size;
    tempQ.arr = (int *)malloc(tempQ.size * sizeof(int));
    if (p->Rear >= p->Front)
    {
        for (int i = p->Front; i <= p->Rear; i++)
        {
            int popped = pop(p);
            if (i == index)
            {
                cout << popped << endl;
            }
            Enqueue(&tempQ, popped);
        }
        for (int i = tempQ.Front; i <= tempQ.Rear; i++)
        {
            int popped = pop(&tempQ);
            Enqueue(p, popped);
            // cout << tempQ.Front << " " << tempQ.Rear << endl;
        }
        // cout << tempQ.Front << " " << tempQ.Rear << endl;
    }
    else
    {
        for (int i = p->Front; i < p->size; i++)
        {
            int popped = pop(p);
            if (i == index)
            {
                cout << popped << endl;
            }
            Enqueue(&tempQ, popped);
        }
        for (int j = 0; j <= p->Rear; j++)
        {
            int popped = pop(p);
            if (j == index)
            {
                cout << popped << endl;
            }
            Enqueue(&tempQ, popped);
        }

        for (int i = tempQ.Front; i < tempQ.size; i++)
        {
            int popped = pop(&tempQ);
            Enqueue(p, popped);
        }
        for (int j = 0; j <= tempQ.Rear; j++)
        {
            int popped = pop(&tempQ);
            Enqueue(p, popped);
        }
    }
}

// function that returns the element at the front of the queue.
int peek(Queue *p)
{
    return p->arr[p->Front];
}

// Driver method
int main()
{
    Queue q;
    q.Front = -1;
    q.Rear = -1;
    cout << "Enter the size: ";
    cin >> q.size;
    q.arr = (int *)malloc(q.size * sizeof(int));
    while (1)
    {
        cout << "\n1.Insert in queue\n";
        cout << "\n2.Delete from queue\n";
        cout << "\n3.Display Queue\n";
        cout << "\n4.Peek into the queue\n";
        cout << "\n5.Search\n";
        cout << "\n6.Exit\n";
        int c;
        cout << "Enter your choice: ";
        cin >> c;
        switch (c)
        {
        case 1:
        {
            int item;
            cout << "Enter the element you want to insert into the queue: ";
            cin >> item;
            Enqueue(&q, item);
            // cout << q.Front << " " << q.Rear << endl;
            break;
        }
        case 2:
        {
            int element = pop(&q);
            cout << element << endl;
            // cout << q.Front << " " << q.Rear << endl;
            break;
        }
        case 3:
        {
            Display(&q);
            break;
        }
        case 4:
        {
            cout << "Top element of Queue is: " << peek(&q);
            break;
        }
        case 5:
        {
            int index;
            cout << "Enter the index that you want to search: ";
            cin >> index;
            Search(&q, index);
            break;
        }
        case 6:
            return 0;

        default:
            cout << "\nEnter a valid choice!!\n";
        }
    }
}
