#include<stdio.h>
#include<stdlib.h>

struct node{
    int data;
    struct node *next;
}*start=NULL;

void createlist(int n)
{
    struct node *temp;
    struct node *new= (struct node *)malloc(sizeof(struct node));
    new->data=n;
    new->next=NULL;
    if(start==NULL)
    start=new;
    else
    {
        temp=start;
        while(temp->next!=NULL)
        {
            temp=temp->next;
        }
        temp->next=new;
    }
    
}
void traverse()
{
    struct node *t;
    t=start;
    while(t!=NULL)
    {
        printf("%d\t",t->data);
        t=t->next;
    }
}
void delete_given_node_from_last(int p)
{
    int i;
    struct node *t1,*t2,*t3;
    t1=start;
    t2=start;
    t3=start;
    for(i=1;i<p+1;i++)
    {
        t1=t1->next;
    }
    while(t2!=NULL && t1!=NULL)
    {
     t3=t2;
     t2=t2->next;
     t1=t1->next;
    }
    t3->next=t2->next;
    free(t2);
}
int main()
{
    int ch,n,p;
    while(1)
    {
        printf("1: Create a new node \n");
        printf("2: Display the linked list\n");
        printf("3: Delete nth node from last\n");
        printf("4: Exit\n");
        printf("Enter your choice\n");
        scanf("%d",&ch);
        switch(ch)
        {
            case 1:
              printf("Enter the value for the new node\n");
              scanf("%d",&n);
              createlist(n);
              break;
            case 2:  
              traverse();
              break;
            case 3:
              printf("Enter the position from the end for the node to be deleted\n");
              scanf("%d",&p);
              delete_given_node_from_last(p);
              break;
            case 4: 
              exit(1);
              default: printf("Invalid option\n");
        }
    }
}