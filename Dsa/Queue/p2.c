#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *next;
} *front = NULL, *rear = NULL;

void Enqueue(int n)
{
    struct node *new = (struct node *)malloc(sizeof(struct node));

    if (new == NULL)
        printf("Overflow\n");
    else
    {
        new->data = n;
        new->next = NULL;
        if (front == NULL)
            front = rear = new;
        else
        {
            rear->next = new;
            rear = new;
        }
    }
}

int Dequeue()
{
    int b = -1;
    if (front == NULL && rear == NULL)
    {
        printf("Underflow\n");
        return;
    }
    else
    {
        struct node *t;
        t = front;
        b = t->data;
        front = front->next;
        free(t);
    }
    return b;
}

void Display()
{
    struct node *t = front;
    if (t == NULL && rear == NULL)
        printf("Underflow\n");
    else
    {
        while (t != NULL)
        {
            printf("%d\n", t->data);
            t = t->next;
        }
    }
}
void reverse()
{
    struct node *p, *t1, *t2;
    p = NULL;
    t1 = front;
    while (t1 != NULL)
    {
        t2 = t1->next;
        t1->next = p;
        p = t1;
        t1 = t2;
    }
    front = p;
    rear = NULL;
}
int main()
{
    int ch, num;
    while (1)
    {
        printf("1: Insert\n2: Delete\n3: Display\n4: Reverse\n5: Exit");
        printf("\nEnter your choice\n");
        scanf("%d",&ch);
        switch(ch)
        {
            case 1:
            printf("Enter the date to be inserted\n");
            scanf("%d",&num);
            Enqueue(num);
            break;
            case 2:
            Dequeue();
            break;
            case 3:
            Display();
            break;
            case 4:
            reverse();
            break;
            case 5:
            exit(1);
            default: printf("Invalid option\n");
        }
    }
    return 0;
}