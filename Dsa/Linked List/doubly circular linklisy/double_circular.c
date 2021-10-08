#include<stdio.h>
#include<stdlib.h>
struct node 
{
    int data;
    struct node *next,*prev;
};
void createlist(struct node **s,struct node **e,int n)
{
    struct node *new=(struct node *)malloc(sizeof(struct node));
    new->data=n;
    new->next=NULL;
    new->prev=NULL;
    if((*s)==NULL)
    {
        (*s)=new;
        (*e)=new;
    }
    else
    {
        new->prev=(*e);
        new->next=(*s);
        (*e)->next=new;
        (*s)->prev=new;
        (*e)=new;
    }
}
void display(struct node **s,struct node **e)
{
struct node *t;
t = (*s);
while(t->next!=(*s))
{
    printf("%d->",t->data);
    t=t->next;
}
printf("%d",t->data);
printf("\n");
}
int main() 
{
    struct node *start=NULL,*end=NULL;
    int ch,n;
    while(1)
    {   
        printf("1: Create a new node\n");
		printf("2: Display\n");
        printf("3: Exit\n");
        printf("Enter user choice\n");
        scanf("%d",&ch);
        switch(ch)
        {
            case 1:
            printf("Enter the value\n");
            scanf("%d",&n);
            createlist(&start,&end,n);
            break;
            case 2:
             display(&start,&end);
             break;
            case 3:
            exit(1);
            default: ("Invalid option\n");
        }
    }
    return 0;
}

