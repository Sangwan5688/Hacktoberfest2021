//Queue implementaton of Stack
#include <stdio.h>
#include <stdlib.h>

#define maxsize 10

struct QUEUE
{
    int front;
    int rear;
    int Queue[maxsize];
};

void enqueue(struct QUEUE *q, int n)
{
    if (q->rear == maxsize - 1)
        printf("Overflow\n");
    else if ((q->front == -1 && q->rear == -1))
    {
        q->front = q->rear = 0;
        q->Queue[q->rear] = n;
    }
    else
    {
        q->rear++;
        q->Queue[q->rear] = n;
    }
}

int dequeue(struct QUEUE *q)
{
    if (q->front == -1 && q->rear == -1)
    {
        printf("Underflow\n");
        return;
    }
    else if ((q->front == q->rear))
    {
        int b = q->Queue[q->front];
        q->front = q->rear = -1;
        return b;
    }
    else
    {
        int d = q->Queue[q->front];
        q->front++;
        return d;
    }
}
void reverse(struct QUEUE *q)
{
    if ((q->front == -1 && q->rear == -1) || (q->front == q->rear))
        return;
    else
    {
        int t = dequeue(q);
        reverse(q);
        enqueue(q, t);
    }
}
void push(struct QUEUE *q, int n)
{
    enqueue(q, n);
}
int pop(struct QUEUE *q)
{
    reverse(q);
    int a = dequeue(q);
    reverse(q);
    return a;
}
void display(struct QUEUE q)
{
    if (q.front == -1 && q.rear == -1)
        return;
    else
    {
        int a = pop(&q);
        printf("%d\n", a);
        display(q);
        push(&q, a);
    }
}
int main()
{
    int ch, num;
    struct QUEUE q1;
    q1.front = q1.rear = -1;
    while (1)
    {
        printf("1: Push into the stack\n");
        printf("2: Pop from the stack\n");
        printf("3: Display\n");
        printf("4: Exit\n");
        printf("Enter your choice\n");
        scanf("%d", &ch);
        switch (ch)
        {
        case 1:
            printf("Enter the data\n");
            scanf("%d", &num);
            push(&q1, num);
            break;
        case 2:
            pop(&q1);
            break;
        case 3:
            display(q1);
            break;
        case 4:
            exit(1);
        default:
            printf("Invalid option\n");
        }
    }
}