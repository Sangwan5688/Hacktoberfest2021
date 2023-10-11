//Circular queue
#include <stdio.h>
#include <stdlib.h>

#define maxsize 10
struct QUEUE
{
    int front;
    int rear;
    int Queue[maxsize];
};
//Inserting function
void Enqueue(struct QUEUE *q, int n)
{
    if ((q->front == 0 && q->rear == maxsize - 1))
        printf("Overflow\n");
    else if (q->front == -1 && q->rear == -1)
    {
        q->front = q->rear = 0;
        q->Queue[q->rear] = n;
    }
    else if((q->rear+1)%maxsize==q->front) 
    {
       printf("List is empty\n");
    }
    else
    {
        q->rear=(q->rear+1)%maxsize;
        q->Queue[q->rear]=n;
    }
    
}
//Deleting function
int Dequeue(struct QUEUE *q)
{
    if (q->front == -1 && q->rear == -1)
        printf("Underflow\n");
    else if (q->front == q->rear)
    {
        int d=q->Queue[q->front];
        q->front = q->rear = -1;
        return d;
    }
    else 
    {
        int b= q->Queue[q->front];
        q->front=(q->front+1)%maxsize;
        return b;
    }
}

void Display(struct QUEUE q)
{
    int i;
    i = q.front;
    while (i != q.rear)
    {
        printf("%d\n", q.Queue[i]);
        i = (i + 1) % maxsize;
    }
    printf("%d\n",q.Queue[q.rear]);
}
  void reverse(struct QUEUE q)
  {
      int i;
      i=q.rear;
      while(i!=q.front)
      {
          printf("%d\n",q.Queue[i]);
          i=(i-1)%maxsize;
      }
      printf("%d\n",q.Queue[q.front]);
  }
int main()
{
    int num, ch;
    struct QUEUE q1;
    q1.front = -1;
    q1.rear = -1;
    while (1)
    {
        printf("1: Insert into the queue\n");
        printf("2: Delete from the queue\n");
        printf("3: Display\n");
        printf("4: Reverse display\n");
        printf("5: Exit\n");
        printf("Enter your choice\n");
        scanf("%d", &ch);
        switch (ch)
        {
        case 1:
            printf("Enter the data to enter\n");
            scanf("%d", &num);
            Enqueue(&q1, num);
            break;
        case 2:
            Dequeue(&q1);
            break;
        case 3:
            Display(q1);
            break;
        case 4:
            reverse(q1);
            break;
        case 5:
            exit(1);
        default:
            printf("Invalid option\n");
        }
    }
}