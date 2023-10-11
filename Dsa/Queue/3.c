#include <stdio.h>
#include <stdlib.h>

#define maxsize 10
struct QUEUE
{
    int front;
    int rear;
    int Queue[maxsize];
};

void Enqueue(int n, struct QUEUE *q)
{
    if (q->front == -1 && q->rear == -1)
    {
        q->front = q->rear = 0;
        q->Queue[q->rear] = n;
    }
    else if (q->rear == maxsize - 1)
    {
        printf("Overflow\n");
    }
    else
    {
        q->rear++;
        q->Queue[q->rear] = n;
    }
}
int Dequeue(struct QUEUE *q)
{
    if (q->front == -1 && q->rear == -1)
    {
        printf("Underflow\n");
        return;
    }
    else if ((q->front == q->rear))
    {
        q->front = -1;
        q->rear = -1;
        return;
    }
    else
    {
        int t = q->Queue[q->front];
        q->front++;
        return t;
    }
}
void D1(struct QUEUE *q1, struct QUEUE *q2)
{
    if (q1->front == q1->rear)
    {
        return;
    }
    else
    {
        while (q1->front != q1->rear)
        {
            int d = Dequeue(q1);
            printf("%d\n", d);
            Enqueue(d, q2);
        }
        
    }
}
void D2(struct QUEUE *q1, struct QUEUE *q2)
{
    if (q1->front == q1->rear==-1)
    {
        return;
    }
    else if
    else
    {
        while (q1->front != q1->rear)
        {
            int b = Dequeue(q1);
            Enqueue(b, q2);
        }
        
    }
}
void Display(struct QUEUE *q1, struct QUEUE *q2)
{
    D1(q1, q2);
    D2(q2, q1);
}
void Reverse(struct QUEUE *q)
{
    int a;
    if (q->front == q->rear)
        return;
    else
    {
        a = Dequeue(q);
        Reverse(q);
        printf("%d\n", a);
        Enqueue(a, q);
    }
}
int main()
{
    struct QUEUE q1, q2;
    q1.front = q2.front = -1;
    q1.rear = q2.rear = -1;
    int ch, num;
    while (1)
    {
        printf("1: Insert\n2: Delete\n3: Display\n4: Reverse\n5: Exit\n");
        printf("Enter your choice\n");
        scanf("%d", &ch);
        switch (ch)
        {
        case 1:
            printf("Enter the data\n");
            scanf("%d", &num);
            Enqueue(num, &q1);
            break;
        case 2:
            Dequeue(&q1);
            break;
        case 3:
            Display(&q1, &q2);
            break;
        case 4:
            Reverse(&q1);
            break;
        case 5:
            exit(1);
        default:
            printf("Invalid option\n");
        }
    }
    return 0;
}
