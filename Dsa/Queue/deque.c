#include <stdio.h>
#include <stdlib.h>
#define maxsize 10
struct DEQUE
{
    int front;
    int rear;
    int deque[maxsize];
};
void enqueue_front(struct DEQUE *q, int n)
{
    if ((q->front == 0 && q->rear == maxsize - 1))
    {
        printf("Queue is full\n");
    }
    else if (q->front == -1 && q->rear == -1)
    {
        q->front = q->rear = 0;
        q->deque[q->rear] = n;
    }
    else if ((q->front==0))
    {
        q->front=maxsize-1;
        q->deque[q->front]=n;
    }
    else
    {
        q->front = (q->front - 1) % maxsize;
        q->deque[q->front] = n;
    }
}
void enqueue_rear(struct DEQUE * q,int x)
{
        if ((q->front == 0 && q->rear == maxsize - 1))
            printf("Overflow\n");
        else if (q->front == -1 && q->rear == -1)
        {
            q->front = q->rear = 0;
            q->deque[q->rear] = x;
        }
        else if ((q->rear + 1) % maxsize == q->front)
        {
            printf("List is full\n");
        }
        else
        {
            q->rear = (q->rear + 1) % maxsize;
            q->deque[q->rear] = x;
        }
}

int dequeue_front(struct DEQUE *q)
{
    if (q->front == -1 && q->rear == -1)
        printf("Underflow\n");
    else if (q->front == q->rear)
    {
        int d=q->deque[q->front];
        q->front = q->rear = -1;
        return d;
    }
    else 
    {
        int b= q->deque[q->front];
        q->front=(q->front+1)%maxsize;
        return b;
    }
}
int dequeue_rear(struct DEQUE *q)
{
    if(q->front==-1 && q->rear==-1)
    printf("Underflow\n");
    else if(q->front==q->rear)
    {
        int d=q->deque[q->rear];
        q->front=q->rear=-1;
        return d;
    }
    else
    {
       int b=q->deque[q->rear];
       q->rear=(q->rear-1)%maxsize;
       return b;   
    }
}
void display(struct DEQUE *q)
{
    int i=q->front;
    while(i!=q->rear)
    {
        printf("%d ",q->deque[i]);
        i=(i+1)%maxsize;
    }
    printf("%d",q->deque[q->rear]);
}
int main()
{
    struct DEQUE d;
    d.front=-1;
    d.rear=-1;
    printf("\nMenu");
    printf("\n1.Implement input restricted queue.");
    printf("\n2.Implement output restricted queue.");
    int ch;
    scanf("%d",&ch);
    if(ch==1){
        printf("\n1.Insert element");
        printf("\n2.Delete from start");
        printf("\n3.Delete From End");
        printf("\n4.Display");
        printf("\n5.Exit");
        int c,e;
        while(1){
            printf("\nEnter your choice:");
            scanf("%d",&c);
            switch(c){
                case 1:
                    printf("\nEnter the data");
                    scanf("%d",&e);
                    enqueue_rear(&d,e);
                    break;
                case 2:
                    printf("\nElement removed:");
                    dequeue_front(&d);
                    break;
                case 3:
                    printf("\nElement removed:");
                    dequeue_rear(&d);
                    break;
                case 4:
                    printf("\nElement are:");
                    display(&d);
                    break;
                case 5:
                    exit(0);
                    break;
                default:
                    exit(0);
                    break; 
            }   
        }
    }
    else if(ch==2){
        printf("\n1.Insert at start");
        printf("\n2.Insert at Last");
        printf("\n3.Delete from start");
        printf("\n4.Display");
        printf("\n5.Exit");
        int c,e;
        while(1){
            printf("\nEnter your choice:");
            scanf("%d",&c);
            switch(c){
                case 1:
                    printf("\nEnter the data");
                    scanf("%d",&e);
                    enqueue_front(&d,e);
                    break;
                case 2:
                    printf("\nEnter the data");
                    scanf("%d",&e);
                    enqueue_rear(&d,e);
                    break;
                case 3:
                    printf("\nElement removed:");
                    dequeue_front(&d);
                    break;
                case 4:
                    printf("\nElement are:");
                    display(&d);
                    break;
                case 5:
                    exit(0);
                    break;
                default:
                    exit(0);
                    break; 
            }
        }
    }
    return 0;
}