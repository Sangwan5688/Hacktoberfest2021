#include <stdio.h>
int stack[100],choice,n,top,i,val;
void push()
{
if(top>=n-1)
{
printf("STACK is over flow\n");
}
else
{
printf(" Enter a value to be pushed:");
scanf("%d",&val);
top++;
stack[top]=val;
}
}
void pop()
{
if(top==-1)
{
printf("\nStack is empty!!");
}
else
{
printf("\nDeleted element is %d\n",stack[top]);
top=top-1;
}
}
void display()
{
int i;
if(top==-1)
{
printf("\nStack is empty!!");
}
else
{
printf("\nStack is\n");
for(i=top;i>=0;i--)
printf("%d\n",stack[i]);
}
}
int main()
{
top=-1;
printf("\n Enter the size of STACK:");
scanf("%d",&n);
printf(" STACK OPERATIONS USING ARRAY\n");
printf("\n\t 1.PUSH\n\t 2.POP\n\t 3.DISPLAY\n\t 4.EXIT\n");
do{
printf("Enter the Choice:");
scanf("%d",&choice);
switch(choice)
{
case 1:
{
push();
break;
}
case 2:
{
pop();
break;
}
case 3:
{
display();
break;
}
case 4:
{
printf(" EXIT ");
break;
}
default:
{
printf ("Enter a Valid Choice");
}
}
}
while(choice!=4);
return 0;
}
