#include<stdio.h>
#include<stdlib.h>
 
#define MAXSIZE 10
int top1=-1;int top2=-1;
int  push(int n,int s[MAXSIZE])
{
    int top;
 if(top==MAXSIZE-1)
 printf("Stack is full\n");
 else
 {
     top++;
     s[top]=n;
     printf("Innsertion successfull\n");
 }
 return top;
}
int pop(int sta[MAXSIZE],int top)
{
    int top;
 if(top==-1)
 printf("Stack is empty\n");
 else{
     top--;
     printf("Deletion successfull\n");
     }
     return top;
}
int display(int st[MAXSIZE])
{
    int top;
 if(top==-1)
    printf("Stack is empty\n");
    else
    {
        int i;
        printf("STACK: \n");
        for(i=top;i>-1;i--)
        printf("%d\n",st[i]);
    } 
    return top;
}
void copy(int s1[MAXSIZE],int s2[MAXSIZE])
{
int b=0;
if(top1==-1)
return;
else{
b= pop(s1,top1);
copy(s1,s2,top1,top2);
push(b,s2,top2);
push(b,s1,top1);
}
}
int main()
{
    
    int stack1[MAXSIZE],stack2[MAXSIZE];
    int ch,n;
    while(1)
    {
        printf("1: Push\n");
        printf("2: Pop\n");
        printf("3: Display stack 1\n");
        printf("4: Copy to 2nd stack\n");
        printf("5: Display stack 2\n");
        printf("6: Exit\n");
        printf("Enter user choice\n");
        scanf("%d",&ch);
        switch(ch)
        {
            case 1:
            printf("Enter the data\n");
            scanf("%d",&n);
            top1=push(n,stack1,top1);
            break;
            case 2:
            top1=pop(stack1,top1);
            break;
            case 3:
            top1=display(stack1,top1);
            break;
            case 4:
            copy(stack1,stack2);
            break;
            case 5:
            top2=display(stack2,top2);
            break;
            case 6:
            exit(1);
            default: printf("Invalid option\n");
        }
    }
    return 0;
}