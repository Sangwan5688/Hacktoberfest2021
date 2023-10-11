#include<stdio.h>
#include<stdlib.h>

//8:55

struct node
{
    int data;
    struct node *link;
};

void print(struct node * ptr)
{
    while(ptr!=NULL)
    {
    printf("Element %d \n", ptr->data);
    ptr = ptr->link;
    }
}

void countn(struct node * head)
{
    int count = 0;
    struct node *ptr = NULL;
    ptr = head;
}

struct node* add_at_beg(struct node* head,int n)
{
    struct node *ptr = malloc(sizeof(struct node));
    ptr->data = n;
    ptr->link = head;

    head = ptr;

    return head;
}

void add_at_end(struct node *head, int data)
{
    struct node *ptr, *temp;
    ptr = head;
    temp = (struct node *)malloc(sizeof(struct node));

    temp->data = data;
    temp->link = NULL;

    while(ptr->link != NULL)
    {
        ptr = ptr->link;
    }
    ptr->link = temp;

}

//9:22....




int main()
{
    struct node *head;
    struct node *second;

    head = (struct node*)malloc(sizeof(struct node));
    second = (struct node*)malloc(sizeof(struct node));
    
    head->data = 111;
    head->link = second;

    second->data = 222;
    second->link = NULL;

    head=add_at_beg(head,333);

    add_at_end(head,444);

    print(head);
    countn(head);

}