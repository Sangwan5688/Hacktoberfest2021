#include<stdio.h>
#include<stdlib.h>
struct node
{  
int data;
    struct node *next;
}*start=NULL;
void createlist(int n)
{
    struct node *temp;
    struct node *new=(struct node *)malloc(sizeof(struct node));
    new->data=n;
    new->next=start;

    if(start==NULL)
    {
    start=new;
    start->next=start;
    }
    else
    {
        temp=start;
        while(temp->next!=start)
        {
            temp=temp->next;
        }
        new->next=start;
        temp->next=new;
    }      
}
void traverse()
{
   struct node *t;
   t=start;
while(t->next!=start)
{
    printf("%d\t",t->data);
    t=t->next;
}
 printf("%d",t->data);
 printf("\n");
}
void add_first_node(int n1)
{
 struct node *t;
 t=start;
 struct node *new=(struct node *)malloc(sizeof(struct node));
 new->data=n1;
 while(t->next!=start)
 {
     t=t->next;
 }
 t->next=new;
 new->next=start;
 start=new;
}
void add_last_node(int n2)
{
  struct node *t;
 t=start;
 struct node *new=(struct node *)malloc(sizeof(struct node));
 new->data=n2;
 while(t->next!=start)
 {
     t=t->next;
 }
 t->next=new;
 new->next=start;
}
void delete_first_node()
{
    struct node *t1,*t2;
    t1=start;
    t2=start;
    while(t1->next!=start)
{ 
    start=t2->next;
    t1=t1->next;
}
t1->next=t2->next;
free(t2);
}
int main()
{
    int n,n1,n2;
    int ch;
    while(1)
    {
        printf("1: Create a new node for the circular link list\n");
        printf("2: Display the circular link list\n");
        printf("3: Add a node at the beginning\n");
        printf("4: Add a node at the end\n");
        printf("5: Delete the first node\n");
        printf("6: Exit\n");
        printf("Enter user choice\n");
        scanf("%d",&ch);
        switch (ch)
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
             printf("Enter the value for the new node\n");
             scanf("%d",&n1);
             add_first_node(n1);
             break;
        case 4: 
             printf("Enter the value for the new node\n");
             scanf("%d",&n2);
             add_last_node(n2);
             break;
        case 5:
             delete_first_node();
             break;
        case 6:
            exit(1);          
        default: printf("Invalid option\n");

        }
    }
    return 0;
}
