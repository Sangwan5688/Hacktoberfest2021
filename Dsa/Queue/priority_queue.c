//Linked list implementation
#include <stdio.h>
#include <stdlib.h>

struct P_queue
{
    int priority_no;
    int data;
    struct P_queue *next;
};

void enqueue(struct P_queue **pq, int n, int p)
{
    struct P_queue *new = (struct P_queue *)malloc(sizeof(struct P_queue));
    new->data = n;
    new->priority_no = p;
    new->next = NULL;
    if ((*pq) == NULL)
        (*pq) = new;
    else
    {
        struct P_queue *t1, *t2;
        t1 = t2 = (*pq);
        if(t1->priority_no<p)
        {
          while((t1!=NULL))
          {
              new->next=(*pq);
              (*pq)=new;
              t1=t1->next;
          }
        }
        else{
        while ((t1 != NULL) && (t1->priority_no >= p))
        {
            t2 = t1;
            t1 = t1->next;
        }
        t2->next = new;
        new->next = t1;
    }
}
}
void dequeue(struct P_queue **pq)
{
    struct P_queue *t;
    t = (*pq);
    (*pq) = (*pq)->next;
    free(t);
}

void display(struct P_queue **pq)
{
    struct P_queue *t1;
    t1 = (*pq);
    while (t1 != NULL)
    {
        printf("%d\t", t1->data);
        t1 = t1->next;
    }
}
int main()
{
    struct P_queue *p = NULL;
    int ch, num, pr;
    while (1)
    {
        printf("1: Insert\n");
        printf("2: Delete\n");
        printf("3: Display\n");
        printf("4: Exit\n");
        printf("Enter the choice of user\n");
        scanf("%d", &ch);
        switch (ch)
        {
        case 1:
            printf("Enter the number to enter\n");
            scanf("%d", &num);
            printf("Enter the priority number\n");
            scanf("%d", &pr);
            enqueue(&p, num, pr);
            break;
        case 2:
            dequeue(&p);
            break;
        case 3:
            display(&p);
            break;
        case 4:
            exit(1);
        default:
            printf("Invalid option\n");
        }
    }
}