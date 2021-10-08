#include<stdio.h>
#include<stdlib.h>

#define MAXSIZE 10

int stack[MAXSIZE],top=-1;

void push(int num)
{
 if(top == MAXSIZE-1 )
 printf("Stack is full\n");
 else
 {
     top++;
     stack[top]=num;
     printf("Insertion successfull\n");
 }
}
void pop()
{
    if(top==-1)
    printf("Stack is empty\n");
    else
    {
        printf("Deleted %d ",stack[top]);
        top--;
        printf("Deletion successful\n");
    }
}
void display()
{
    if(top==-1)
    printf("Stack is empty\n");
    else
    {
        int i;
        printf("STACK: \n");
        for(i=top;i>-1;i--)
        printf("%d\n",stack[i]);
    } 
}
int main()
{
    int ch,num;
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