#include<stdio.h>
#include<stdlib.h>
struct node 
{
int data;
struct node *next;
}*head=NULL;
void createlist(int n)
{
    struct node *temp;
    struct node *new=(struct node *)malloc(sizeof(struct node));
    new->data=n;
    new->next=NULL;
    if(head==NULL)
    head=new;
    else
    {
        temp=head;
        while(temp->next!=NULL)
        {
            temp=temp->next;
        }
        temp->next=new;
    }
}
void header()
{
    struct node *t;
    t=head;
    int num,c=0;
    while(t!=NULL)
    {
        t=t->next;
        c++;
    }
    num=c;
    struct node *new=(struct node *)malloc(sizeof(struct node));
    new->data=num;
    new->next=head;
    head=new;
}
void display()
{
    struct node *t1;
    t1=head;
    while(t1!=NULL)
    {
        printf("%d\t",t1->data);
        t1=t1->next;
    }
}
int main()
{
    int n,ch;
    while(1)
    {
     printf("1: Create a new node \n");
     printf("2: Add a header node containing the count of no. of node\n");
     printf("3: Display the header link list\n");
     printf("4: Exit\n");
     printf("Enter the user choice\n");
     scanf("%d",&ch);
     switch(ch)
     {
         case 1:
          printf("Enter the value to be entered in the new node\n");
          scanf("%d",&n);
          createlist(n);
          break;
         case 2:
          header();
          break;
         case 3:
          printf("The header link list formed is this\n");
          display();
          printf("\n");
          break;
         case 4:
          exit(1);
          default: printf("Invalid option\n"); 
     }
    }
}