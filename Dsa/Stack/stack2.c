#include<stdio.h>
#include<stdlib.h>

struct node{
    int data;
    struct node *next;
}*STACK=NULL;

void push(int n)
{
  struct node *new=(struct node *)malloc(sizeof(struct node));
 if(new==NULL)
 printf("Could not enter\n");
 else{
  new->data=n;
  new->next=STACK;
  STACK=new;
  printf("Insertion successful\n");
}
}

void pop()
{
    struct node *t;
    if(STACK==NULL)
    printf("Stack is empty\n");
    else
    {
        t=STACK;
        printf("Deleted %d\n",t->data);
        STACK=STACK->next;
        free(t);
        printf("Deletion successfull\n");
    }
}

void display()
{
struct node *t;
t=STACK;
printf("Stack: \n");
while(t!=NULL)
{
    printf("%d\n",t->data);
    t=t->next;
}
}
int main()
{
    int ch,num,max;
    while(1)
    {
        printf("1: PUSH\n");
        printf("2: POP\n");
        printf("3: DISPLAY\n");
        printf("4: EXIT\n");
        printf("Enter the user choice\n");
        scanf("%d",&ch);
        switch(ch)
        {
            case 1:
               
               printf("Enter the data\n");
               scanf("%d",&num);
               push(num);
               break;
            case 2:
               pop();
               break;
            case 3:
               display();
               break;
            case 4:
               exit(1);
               default: printf("Invalid option\n");
        }
    }
    return 0;
}